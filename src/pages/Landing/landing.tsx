import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import "./landing.css";
import { Link } from "react-router-dom";

export function Landing() {
  var isLoggedIn: boolean;
  if (localStorage.getItem("access_token") === null) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }
  return (
    <Fragment>
      <Navbar />
      <div className="title-group">
        <h1 className="title">E-auctions made easy!</h1>
        <p className="body">
          Simple way for selling your unused products, or <br />
          getting a deal on product you want!
        </p>
        {isLoggedIn ? (
          <Link to="Home" className="btn btn-primary">
            Start bidding
          </Link>
        ) : (
          <Link to="Register" className="btn btn-primary">
            Start bidding
          </Link>
        )}
        <div>
          <img className="img"></img>
        </div>
      </div>
    </Fragment>
  );
}

export default Landing;
