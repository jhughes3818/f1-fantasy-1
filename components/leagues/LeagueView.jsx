import axios from "axios";
import { useEffect, useState } from "react";

export default function LeagueView(props) {
  const [leagueMembers, setLeagueMembers] = useState([]);
  const [leagueName, setLeagueName] = useState();

  useEffect(() => {
    axios.get(`/api/leagues/${props.leagueCode}`).then((response) => {
      console.log(response.data.league.members);
      setLeagueName(response.data.league.name);
      const members = response.data.league.members;
      setLeagueMembers(members);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">{leagueName}</h1>
      <table className="table-auto">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leagueMembers.map((member) => (
            <tr key={leagueMembers.indexOf(member)}>
              <td className="pr-5">{member.name}</td>
              <td>{member.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
