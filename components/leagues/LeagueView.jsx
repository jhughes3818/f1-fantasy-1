import axios from "axios";
import { useEffect, useState } from "react";

export default function LeagueView(props) {
  const [leagueMembers, setLeagueMembers] = useState([]);

  useEffect(() => {
    axios.get(`/api/leagues/${props.leagueCode}`).then((response) => {
      console.log(response.data.league.members);
      const members = response.data.league.members;
      setLeagueMembers(members);
    });
  }, []);

  return (
    <div>
      <h1>League is: 12345</h1>
      {leagueMembers.map((member) => (
        <div key={leagueMembers.indexOf(member)}>
          <p>{member}</p>
        </div>
      ))}
    </div>
  );
}
