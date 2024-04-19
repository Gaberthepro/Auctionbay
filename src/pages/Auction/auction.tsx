import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auction.css";
import { Auction } from "../../components/auciton-card/auction-card";
import { useParams } from "react-router-dom";
import axios from "axios";

export function AuctionPage() {
  let { id } = useParams();
  let auction: Auction;

  axios
    .get("http://localhost:3000/auctions/one/" + id)
    .then((response) => {
      auction = response.data;
      console.log(auction);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Fragment>
      <h1>This is auction page</h1>
    </Fragment>
  );
}

export default AuctionPage;
