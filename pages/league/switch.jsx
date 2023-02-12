import SwitchLeague from "../../components/leagues/SwitchLeague";
import LayoutShell from "../../components/LayoutShell";
import { navigationLeague } from "../../components/navigation/Navigation";

export default function Switch() {
  return (
    <LayoutShell nav={navigationLeague}>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">Change League</h1>
        <SwitchLeague />
      </div>
      <div></div>
    </LayoutShell>
  );
}
