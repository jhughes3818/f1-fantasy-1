import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  // On get request, retrieve trades from database
  //console.log(req.query);

  if (req.method === "GET") {
    const trades = [];
    //console.log(req.query.leagueKey);

    const tradesItem = await getTrades(req.query.leagueKey);
    //console.log(tradesItem);

    // tradesItem.forEach((trade) => {
    //   const driverNames = getDriverNames(trade);
    //   console.log(driverNames);
    // });

    for (const trade of tradesItem) {
      const driverNames = await getDriverNames(trade);
      console.log("User");
      console.log(trade.user);
      const userName = await getUserName(trade.user);
      //console.log(driverNames);
      const tradeItem = {
        id: trade.id,
        user: userName,
        league: trade.league,
        driver_bought: driverNames[0],
        driver_bought_id: trade.driver_bought,
        driver_sold: driverNames[1],
        driver_sold_id: trade.driver_sold,
        date: trade.created_at,
      };
      trades.push(tradeItem);
    }

    // console.log(trades);
    res.status(200).json(trades);
  }

  if (req.method === "POST") {
    // console.log(req.body);

    //Get user league code from database in profiles table
    const userLeague = await supabase
      .from("profiles")
      .select("league_code")
      .eq("id", req.body.trade.user.id)
      .then((response) => {
        console.log(response.data);
        return response.data[0].league_code;
      });

    const { data, error } = await supabase.from("trades").insert([
      {
        user: req.body.trade.user.id,
        league_code: userLeague,
        driver_bought: req.body.trade.driverBought.id,
        driver_sold: req.body.trade.driverSold.id,
      },
    ]);

    console.log(data, error);
    res.status(200).json(data);
  }
}

async function getTrades(leagueKey) {
  const trades = [];

  //from supabse, get all trades for the league where league = leagueKey
  await supabase
    .from("trades")
    .select("*")
    .eq("league_code", leagueKey)
    .then((response) => {
      //console.log(response.data);
      response.data.forEach((trade) => {
        trades.push(trade);
      });
    });

  //console.log(trades);

  return trades;
}

async function getDriverNames(trade) {
  const driverIds = [trade.driver_bought, trade.driver_sold];
  const driversNames = [];

  await supabase
    .from("drivers")
    .select("first_name, last_name, price")
    .in("id", driverIds)
    .then((response) => {
      //console.log(response.data);
      response.data.forEach((driver) => {
        driversNames.push(driver);
      });
    });

  //console.log(driversNames);

  return driversNames;
}

async function getUserName(userKey) {
  //console.log(userKey);
  const user = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userKey)
    .then((response) => {
      //console.log(response.data);
      return response.data[0].username;
    });

  //console.log(user);

  return user;
}
