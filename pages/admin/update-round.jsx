import { useState } from "react";

export default function UpdateRound() {
  const [round, setRound] = useState();
  return (
    <>
      <div className="grid place-items-center">
        <h1>{round}</h1>
        <input
          className="input-styling"
          placeholder="Latest Round"
          onChange={(e) => setRound(e.target.value)}
        ></input>
        <button className="button-styling">Update</button>
      </div>
    </>
  );
}
