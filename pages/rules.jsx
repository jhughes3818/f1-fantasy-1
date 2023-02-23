import LayoutShell from "../components/LayoutShell";
import { navigationRules } from "../components/navigation/Navigation";
import { useSession } from "@supabase/auth-helpers-react";

export default function Rules() {
  const session = useSession();

  const navigation = navigationRules.map((item) => ({
    ...item,
    href: item.href === "#" ? `/team/${session?.user.id}` : item.href,
  }));

  return (
    <LayoutShell nav={navigation}>
      <div className="mt-5">
        <div className="">
          <h1 className="text-3xl font-bold">Rules</h1>
          <h2 className="text-xl font-bold mt-3">Building Your Team</h2>
          <p className="text-gray-600">
            Each player starts each season with $15m to spend on their team. A
            team consists of 5 drivers.
            <br></br>
            During the season, drivers prices will go up and down depending on
            their performance. The better a driver performs, the more expensive
            they become.
            <br></br>
            <br></br>A player can grow their budget by buying and selling
            drivers for a profit. If done correctly, a player will progressively
            be able to afford more expensive, and thus better performing
            drivers.
            <br></br>
            <br></br> The value of a team is the sum of the values of its
            drivers plus the remaining cash.
          </p>
          <h2 className="text-xl font-bold mt-3">Scoring Points</h2>
          <p className="text-gray-600">
            Each driver earns points based on their performance during a race
            weekend. Points are awarded based on the driver's qualifying
            position, finishing position, and the number of positions gained or
            lost during the race.
            <br></br>
            <br></br>
            For each race weekend, a team is awarded points equal to the sum of
            the points earned by its drivers.
          </p>
          <h2 className="text-xl font-bold mt-3">Trading</h2>
          <p className="text-gray-600">
            As drivers perform better or worse, their prices will change. A
            player can buy and sell drivers to make a profit, and grow their
            team's budget over time.
            <br></br>
            <br></br>
            Done well, a player will be able to afford more expensive drivers,
            and thus earn more points during the season.
            <br></br>
            <br></br>
            Trades can be made at any time during the season, but a player must
            have enough cash to cover the cost of the trade. Trading closes at
            the start of qualifying in each race weekend, and opens once results
            have been processed shortly after the conclusion of the race.
          </p>
        </div>
      </div>
    </LayoutShell>
  );
}
