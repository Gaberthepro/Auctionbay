import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import "./landing.css";

export function Landing() {
  return (
    <Fragment>
      <Navbar />
      <div className="title-group">
        <h1 className="title">E-auctions made easy!</h1>
        <p className="body">
          Simple way for selling your unused products, or <br />
          getting a deal on product you want!
        </p>
        <a href="/Register" className="btn btn-primary">
          Start bidding
        </a>
        <img className="img" src="https://s3-alpha-sig.figma.com/img/2013/78e4/774a00e95894930c9bb5dc4f77a1322d?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=baNRyrA4SDHI74T15Yf580HrYEa~27IOu1JVfJEFs6WZswFT9HhZh2vXoVAERLAfuMwS9u~aAz96c7fyZtyOSym~eFX5q6cGfmuQQmwp-fFQMPEvz6-1AUUxDs2cWWc2B0cycRnyA9D7Y3rJXo4RXuciaRN4QwinsOPJxWWCxkU-yr4k-VkhY8tulNYl5AOf7-Z9X8ftA8EtwuUwnxj9Lxyz-E7SHPp71TrVzpXIsAnfmtAWFwaPxgNshZ83sVDd51PYwp7x0IrccagDoHIJKL32hZrwwiTQ2eMZJC4eRspNOWLeIeQLC~W2F0xpK6u4SKDJcX7K8kIUnZoTXQz1Gg__"></img>
      </div>
    </Fragment>
  );
}

export default Landing;
