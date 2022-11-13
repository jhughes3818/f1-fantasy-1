import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import FeedDriverPill from "./FeedDriverPill";

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
      <div>
        <h1 className="text-3xl font-bold">Recent Trades</h1>
        <div className="box-styling border-l border-r border-gray-300 bg-gray-100 h-96 overflow-auto">
          {trades.map((trade) => (
            <div className="my-2">
              <FeedDriverPill
                driverBought={trade.driverBought.name}
                driverSold={trade.driverSold.name}
                user={trade.user}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
