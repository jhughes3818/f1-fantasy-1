import supabase from "../../../database/supabaseClient";

export default async function handler(req, res) {
  // On get request, retrieve trades from database

  if (req.method === "GET") {
    const trades = [];

    const tradesItem = await getTrades(req.query.leagueKey);

    for (const trade of tradesItem) {
      if (trade.type === "trade") {
        const driverNames = await getDriverNames(trade);
        console.log("User");
        console.log(trade.user);
        const userName = await getUserName(trade.user_id);

        const tradeItem = {
          id: trade.id,
          user: userName,
          league: trade.league,
          driver_bought: driverNames[0],
          driver_bought_id: trade.driver_bought,
          driver_sold: driverNames[1],
          driver_sold_id: trade.driver_sold,
          date: trade.created_at,
          type: "trade",
        };
        trades.push(tradeItem);
      } else {
        console.log(trade.league_result[0].team_name);
        const tradeItem = {
          id: trade.id,
          league: trade.league,
          date: trade.created_at,
          round_name: trade.round_name,
          first_team: {
            name: trade.league_result[0]?.team_name,
            points: trade.league_result[0]?.points,
          },
          second_team: {
            name: trade.league_result[1]?.team_name,
            points: trade.league_result[1]?.points,
          },
          type: "round",
        };
        trades.push(tradeItem);
      }
    }

    console.log(trades);
    res.status(200).json(trades);
  }

  if (req.method === "POST") {
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
        user_id: req.body.trade.user.id,
        league_code: userLeague,
        driver_bought: req.body.trade.driverBought.id,
        driver_sold: req.body.trade.driverSold.id,
        type: "trade",
      },
    ]);

    if (error) {
      console.log(error);
      res.status(500).json({ error: error });
    } else {
      res.status(200).json({ message: "Trade added" });
    }
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
      response.data.forEach((trade) => {
        trades.push(trade);
      });
    });

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
      response.data.forEach((driver) => {
        driversNames.push(driver);
      });
    });

  return driversNames;
}

async function getUserName(userKey) {
  const user = await supabase
    .from("profiles")
    .select("username")
    .eq("id", userKey)
    .then((response) => {
      return response.data[0].username;
    });

  return user;
}
