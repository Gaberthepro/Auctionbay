import { Fragment } from "react/jsx-runtime";
import axios from "axios";
import Card, { Auction } from "../../components/auciton-card/auction-card";
import { useEffect, useState } from "react";

export function Bidding() {
  const user_id = localStorage.getItem("user_id");
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bids/me/bidding/" + user_id)
      .then((response) => {
        setAuctions(response.data);
      })
      .then((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <Fragment>
      <div className="cards-grid-container" style={{ marginLeft: "1rem" }}>
        {auctions.map((auction) => (
          <Card key={auction.id} auction={auction} />
        ))}
      </div>
    </Fragment>
  );
}

export default Bidding;
