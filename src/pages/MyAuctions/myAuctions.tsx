import { Fragment } from "react/jsx-runtime";
import Card, { Auction } from "../../components/auciton-card/auction-card";
import { useEffect, useState } from "react";
import axios from "axios";

export function MyAuctions() {
  const user_id = localStorage.getItem("user_id");

  const [myAuctions, setMyAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auctions/me/" + user_id)
      .then((response) => {
        setMyAuctions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  return (
    <Fragment>
      <div className="cards-grid-container" style={{ marginTop: "1rem" }}>
        {myAuctions.map((auction) => (
          <Card key={auction.id} auction={auction} />
        ))}
      </div>
    </Fragment>
  );
}

export default MyAuctions;
