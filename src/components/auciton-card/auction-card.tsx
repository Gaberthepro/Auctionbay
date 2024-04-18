import { Fragment } from "react/jsx-runtime";
import "./auction-card.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function Card() {
  var auction_id = 52;
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [end_date, setDate] = useState("");
  var over24h: boolean;
  var isDone: boolean;

  const targetDate: any = new Date(end_date);
  const now: any = new Date();
  const diffInHours = Math.round((targetDate - now) / 1000 / 60 / 60);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auctions/one/" + auction_id)
      .then((response) => {
        setImg(response.data.imgURl);
        setTitle(response.data.title);
        setPrice(response.data.starting_price);
        setDate(response.data.end_date);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auction_id]);

  if (diffInHours < 24) {
    over24h = true;
  } else {
    over24h = false;
  }

  if (diffInHours < 0) {
    isDone = true;
  } else {
    isDone = false;
  }

  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          {isDone ? (
            <div className="row">
              <div className="col" id="left-badge">
                <span id="done" className="badge badge-pill badge-dark">Done</span>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col" id="left-badge">
                <span className="badge rounded-pill text-bg-danger">
                  Outbid
                </span>
              </div>
              <div className="col" id="right-badge">
                {over24h ? (
                  <span
                    id="clock-badge-less-24"
                    className="badge rounded-pill text-bg-danger"
                  >
                    {diffInHours} h <FontAwesomeIcon icon={faClock} />
                  </span>
                ) : (
                  <span
                    id="clock-badge"
                    className="badge rounded-pill text-bg-danger"
                  >
                    24 <FontAwesomeIcon icon={faClock} />
                  </span>
                )}
              </div>
            </div>
          )}

          <h4 className="card-title">{title}</h4>
          <h4 className="card-text">{price} €</h4>
        </div>
        <img src={img} className="img-card" alt="..." />
      </div>
    </Fragment>
  );
}

export default Card;
