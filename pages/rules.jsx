export default function Rules() {
  return (
    <div className="grid place-items-center">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold">Rules</h1>
        <h2 className="text-xl font-bold">Building Your Team</h2>
        <p className="text-gray-600">
          Each player starts each season with $15m to spend on their team. A
          team consists of 5 drivers.
          <br></br>
          During the season, drivers prices will go up and down depending on
          their performance. The better a driver performs, the more expensive
          they become.
          <br></br>A player can grow their budget by buying and selling drivers
          for a profit. If done correctly, a player will progressively be able
          to afford more expensive, and thus better performing drivers.
          <br></br> The value of a team is the sum of the values of its drivers
          plus the remaining cash.
        </p>
        <h2 className="text-xl font-bold">Scoring Points</h2>
        <p className="text-gray-600">
          Each driver earns points based on their performance during a race
          weekend. Points are awarded based on the driver's qualifying position,
          finishing position, and the number of positions gained or lost during
          the race.
          <br></br>
          For each race weekend, a team is awarded points equal to the sum of
          the points earned by its drivers.
        </p>
      </div>
    </div>
  );
}
