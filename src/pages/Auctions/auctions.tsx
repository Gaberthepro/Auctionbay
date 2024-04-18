import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/auciton-card/auction-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auction } from "../../components/auciton-card/auction-card";
import "./auction.css";

export function Auctions() {
  const user_id = localStorage.getItem("user_id");

  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auctions/" + user_id)
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <Fragment>
      <div className="auction-body">
        <h1>Auctions</h1>
        <div className="cards-grid-container">
          {auctions.map((auction) => (
            <Card key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default Auctions;
