import { Fragment } from "react/jsx-runtime";
import "./auction-card.css";
import { useState } from "react";
import axios from "axios";

export function Card(auction_id: number) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  axios
    .get("http://localhost:3000/auctions/one/48")
    .then((response) => {
      setImg(response.data.imgURl);
      setTitle(response.data.title);
      setPrice(response.data.starting_price);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col" id="left-badge">
              <span className="badge rounded-pill text-bg-danger">Outbid</span>
            </div>
            <div className="col" id="right-badge">
              <span className="badge rounded-pill text-bg-danger">24h</span>
            </div>
          </div>
          <h4 className="card-title">{title}</h4>
          <h4 className="card-text">{price} €</h4>
        </div>
        <img src={img} className="img-card" alt="..." />
      </div>
    </Fragment>
  );
}

export default Card;
