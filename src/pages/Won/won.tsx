import { Fragment } from "react/jsx-runtime";
import axios from "axios";
import Card, { Auction } from "../../components/auciton-card/auction-card";
import { useEffect, useState } from "react";

export function Won() {
  const user_id = localStorage.getItem("user_id");
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/bids/me/won/" + user_id
        );
        setAuctions(response.data);
        setIsEmpty(response.data.length === 0);
      } catch (error) {
        console.error(error);
        setIsEmpty(true);
      }
    };

    fetchData();
  }, [user_id]);

  useEffect(() => {
    if (isEmpty) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isEmpty]);
  return (
    <Fragment>
      {isEmpty ? (
        showMessage && (
          <div className="parent-element-bidding">
            <div className="empty-content-bidding">
              <h2>Nothing here yet?</h2>
              <p>
                When you win auction items will be displayed here! Go on and bid
                on your favorite items!
              </p>
            </div>
          </div>
        )
      ) : (
        <div
          className="cards-grid-container"
          style={{ marginLeft: "1rem", marginTop: "1rem" }}
        >
          {auctions.map((auction) => (
            <Card key={auction.id} auction={auction} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default Won;
