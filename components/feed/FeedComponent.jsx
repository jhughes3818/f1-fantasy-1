import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import FeedDriverPill from "./FeedDriverPill";

export default function TradesView() {
  const session = useSession();
  const [leagueCode, setLeagueCode] = useState();
  const [trades, setTrades] = useState();

  if (trades) {
    return (
      <div>
        <h1 className="text-3xl font-bold">Recent Trades</h1>
        <div className="box-styling border-l border-r border-gray-300 bg-gray-100 h-96 overflow-auto">
          {trades.map((trade) => (
            <div className="my-2" key={trade.message}>
              <FeedDriverPill
                driverBought={trade.driverBought.name}
                driverSold={trade.driverSold.name}
                user={trade.user}
                message={trade.message}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
