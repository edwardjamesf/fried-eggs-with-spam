import {Link} from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <h2>Fried Eggs With Spam</h2>
      <p>EJ's shitty ass web app to track his video games</p>
      <Link to={'/purchases'}><button>Purchases</button></Link>
      <Link to={'/consoles'}><button>Consoles</button></Link>
      <Link to={'/games'}><button>Games</button></Link>
    </>
  );
}