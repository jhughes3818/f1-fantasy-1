import { useState } from "react";

export default function DriverSelectBox(props) {
  const [name, setName] = useState(props.name);
  return (
    <div className="relative w-64 box-styling pl-2 pr-10">
      <div className="static w-72">
        <h1 className="text-3xl p-0 font-bold">{name}</h1>

        <h2 className="text-xl text-[#A1A1A1] leading-none">{props.team}</h2>
        <p>Price: ${props.price}m</p>
        <p>Season Points: {props.seasonPoints}</p>
        <p>Average Overtakes: {props.overtakes}</p>
        <p>Best Race Result: {props.bestRaceResult}</p>
        <p>Best Qualifying Result: {props.bestQualifyingResult}</p>
      </div>
      {props.button}
    </div>
  );
}
