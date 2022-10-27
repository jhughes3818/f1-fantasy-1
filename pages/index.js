import ProgressBar from "../components/progress-bar";
import DriverSelectBox from "../components/driver-select-box";
import styles from "../styles/Home.module.css";
import TeamPill from "../components/team-pill";
import TeamBuildMobile from "../components/team-build-mobile";
import DriverSelected from "../components/driver-selected";
import TeamGrid from "../components/team-grid";
import Example from "../components/dashboard";

export default function Home() {
  // return <DriverSelectBox name="Lewis Hamilton" team="Mercedes" price="5m" />;
  return <TeamBuildMobile />;
}
