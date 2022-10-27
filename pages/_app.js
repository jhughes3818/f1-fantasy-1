import Example from "../components/dashboard";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Example>
      <Component {...pageProps} />
    </Example>
  );
}

export default MyApp;
