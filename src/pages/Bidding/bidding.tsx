import { Fragment } from "react/jsx-runtime";
import axios from "axios";
import Card, { Auction } from "../../components/auciton-card/auction-card";
import { useEffect, useState } from "react";
import "./bidding.css";

export function Bidding() {
  const user_id = localStorage.getItem("user_id");
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/bids/me/bidding/" + user_id
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
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isEmpty]);

  return (
    <Fragment>
      {isEmpty ? (
        showMessage && (
          <div className="parent-element-bidding">
            <div className="empty-content-bidding">
              <h2>No bidding in progress!</h2>
              <p>
                Start bidding by finding new items you like on “Auction” page!
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

export default Bidding;
