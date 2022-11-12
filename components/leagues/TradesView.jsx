import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function TradesView() {
  const { data: session } = useSession();
  const [leagueCode, setLeagueCode] = useState();
  const [trades, setTrades] = useState();

  useEffect(() => {
    if (session) {
      axios.get(`/api/users/${session.user.email}`).then((response) => {
        console.log(response.data.user.league);
        setLeagueCode(response.data.user.league);
        axios
          .get(`/api/trades/${response.data.user.league}`)
          .then((response) => {
            setTrades(response.data.leagueTrades.trades);
            console.log(response.data.leagueTrades);
          });
      });
    }
  }, []);

  if (trades) {
    return (
      <div className="box-styling h-96 overflow-auto">
        {trades.map((trade) => (
          <div className="box-styling mx-4 my-2 p-2">
            <h1 className="font-bold">{trade.user.name}</h1>
            <h1>Driver Sold: {trade.driverSold.name}</h1>
            <h1>Driver Bought: {trade.driverBought.name}</h1>
            <h1>Profit: {trade.profit}</h1>
          </div>
        ))}
      </div>
    );
  }
}
