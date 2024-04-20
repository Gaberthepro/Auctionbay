import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/auciton-card/auction-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Auction } from "../../components/auciton-card/auction-card";
import "./auctions.css";

export function Auctions() {
  const user_id = localStorage.getItem("user_id");

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auctions/" + user_id
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
      <div className="auction-body">
        <h1>Auctions</h1>
        {isEmpty ? showMessage &&(
          <div className="parent-element-bidding">
            <div className="empty-content-bidding">
              <h2>Oh no, no auctions yet!</h2>
              <p>
                To add new auction click “+” button in navigation bar or wait
                for other users to add new auctions.
              </p>
            </div>
          </div>
        ) : (
          <div className="cards-grid-container">
            {auctions.map((auction) => (
              <Card key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Auctions;
