import { Fragment } from "react/jsx-runtime";
import Card, { Auction } from "../../components/auciton-card/auction-card";
import { useEffect, useState } from "react";
import axios from "axios";

export function MyAuctions() {
  const user_id = localStorage.getItem("user_id");

  const [myAuctions, setMyAuctions] = useState<Auction[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auctions/me/" + user_id
        );
        setMyAuctions(response.data);
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
              <h2>Oh no, no auctions added!</h2>
              <p>
                To add new auction click “+” button in navigation bar and new
                auctions wil be added here!
              </p>
            </div>
          </div>
        )
      ) : (
        <div
          className="cards-grid-container"
          style={{ marginLeft: "1rem", marginTop: "1rem" }}
        >
          {myAuctions.map((auction) => (
            <Card key={auction.id} auction={auction} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default MyAuctions;
