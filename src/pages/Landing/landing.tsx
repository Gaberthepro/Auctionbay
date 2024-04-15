import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import "./landing.css";

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
          <a href="/Home" className="btn btn-primary">
            Start bidding
          </a>
        ) : (
          <a href="/Register" className="btn btn-primary">
            Start bidding
          </a>
        )}
        <img
          className="img"
          src="https://s3-alpha-sig.figma.com/img/2013/78e4/774a00e95894930c9bb5dc4f77a1322d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YT6YUBJr-z~-cGUXPcxfIrvz~tS9YcVN59G8UHVLB4gwvarhrdkl8vClNpmy-NvpcBsolT4mz-iCwHSNZ18jKuE4-I3FrxiomubnYvuURpeu2yswaFiLAVfMt-~SdQb0y5ZxgMnXadDygVjYcnCf~mtLomATvpCrxJKIpe59UfnuUC1vhM2TAUh2NqoYb0HOXO1L1HpXNFWiQ5fbkCQ9ZlZ43zcO8rNC6PNRUpLsroXRKJcV8ueGEYTwRLRcE4imo~KWVcIB1GBKh9WFiblxpjf3evEzlE7xL4fFOHobOma-Y88dEPn2Yx4f6J02qBPfZEenfPUrYrDf6Wurx7M~Zg__"
        ></img>
      </div>
    </Fragment>
  );
}

export default Landing;
