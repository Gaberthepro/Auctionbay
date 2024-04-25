import { Fragment } from "react/jsx-runtime";
import "./auction-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from "axios";
import { useEffect, useState } from "react";
import EditAuction from "../modals/editAuction/editAuction";
import { Link } from "react-router-dom";

export interface Auction {
  id: number;
  title: string;
  description: string;
  starting_price: number;
  end_date: Date;
  imgURl: string;
  user: {
    id: number;
  };
}

interface AuctionCardProps {
  auction: Auction;
}

const Card: React.FC<AuctionCardProps> = ({ auction }) => {
  var over24h: boolean;
  var isDone: boolean;
  const [badgeStatus, setBadgeStatus] = useState("progress");
  const [bids, setBids] = useState([]);
  const user_id = localStorage.getItem("user_id");
  var myAuction = false;
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });

  const [showModalEditAuction, setShowModalEditAuction] = useState(false);
  const handleShowEditAuction = () => setShowModalEditAuction(true);
  const handleCloseEditAuction = () => setShowModalEditAuction(false);

  const targetDate: any = new Date(auction.end_date);
  const now: any = new Date();
  const diffInHours = Math.round((targetDate - now) / 1000 / 60 / 60);
  const diffInDays = Math.round((targetDate - now) / 1000 / 60 / 60 / 24);

  if (diffInHours > 24) {
    over24h = true;
  } else {
    over24h = false;
  }

  if (diffInHours < 0) {
    isDone = true;
  } else {
    isDone = false;
  }

  if (
    user_id &&
    auction?.user?.id &&
    parseInt(user_id) === auction.user.id &&
    diffInHours > 0
  ) {
    myAuction = true;
  }

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/auctions/" + auction.id)
      .then(() => {
        notyf.success("Auction was succesfuly removed");
      })
      .catch((error) => {
        console.log(error);
      });

    location.reload();
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/bids/" + auction.id)
      .then((response) => {
        setBids(response.data);
        const firstBid = response.data[0];
        if (bids.length == 0) {
          setBadgeStatus("progress");
        }
        if (firstBid.user.id == user_id) {
          setBadgeStatus("winning");
        } else {
          const isOutbid = bids.some(
            (bid: any, index: any) => index !== 0 && bid.user.id === user_id
          );
          console.log(isOutbid)
          if (!isOutbid) {
            setBadgeStatus("outbid");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auction.id, badgeStatus, , user_id]);

  return (
    <Fragment>
      <div className="card">
        {myAuction ? (
          <>
            <div className="card-body">
              {isDone ? (
                <div className="row">
                  <div className="col" id="left-badge">
                    <span id="done" className="badge badge-pill badge-dark">
                      Done
                    </span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col" id="left-badge">
                    {badgeStatus == "outbid" && !myAuction ? (
                      <span
                        id="danger"
                        className="badge rounded-pill text-bg-danger"
                      >
                        Outbid
                      </span>
                    ) : badgeStatus == "winning" ? (
                      <span
                        id="succes"
                        className="badge rounded-pill text-bg-success"
                      >
                        Winning
                      </span>
                    ) : (
                      <span
                        id="warning"
                        className="badge rounded-pill text-bg-warning"
                      >
                        In progress
                      </span>
                    )}
                  </div>
                  <div className="col" id="right-badge">
                    {over24h ? (
                      <span
                        id="clock-badge-less-24"
                        className="badge rounded-pill text-bg-danger"
                      >
                        {diffInDays} days <FontAwesomeIcon icon={faClock} />
                      </span>
                    ) : (
                      <span
                        id="clock-badge"
                        className="badge rounded-pill text-bg-danger"
                      >
                        {diffInHours} h <FontAwesomeIcon icon={faClock} />
                      </span>
                    )}
                  </div>
                </div>
              )}
              <h4 className="card-title">{auction.title}</h4>
              <h4 className="card-text">{auction.starting_price} €</h4>
            </div>
            <img src={auction.imgURl} className="img-card" alt="..." />
          </>
        ) : (
          <Link
            to={`/auction/${auction.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card-body">
              {isDone ? (
                <div className="row">
                  <div className="col" id="left-badge">
                    <span id="done" className="badge badge-pill badge-dark">
                      Done
                    </span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col" id="left-badge">
                    {badgeStatus == "outbid" ? (
                      <span
                        id="danger"
                        className="badge rounded-pill text-bg-danger"
                      >
                        Outbid
                      </span>
                    ) : badgeStatus == "winning" ? (
                      <span
                        id="succes"
                        className="badge rounded-pill text-bg-success"
                      >
                        Winning
                      </span>
                    ) : (
                      <span
                        id="warning"
                        className="badge rounded-pill text-bg-warning"
                      >
                        In progress
                      </span>
                    )}
                  </div>
                  <div className="col" id="right-badge">
                  {over24h ? (
                      <span
                        id="clock-badge-less-24"
                        className="badge rounded-pill text-bg-danger"
                      >
                        {diffInDays} days <FontAwesomeIcon icon={faClock} />
                      </span>
                    ) : (
                      <span
                        id="clock-badge"
                        className="badge rounded-pill text-bg-danger"
                      >
                        {diffInHours} h <FontAwesomeIcon icon={faClock} />
                      </span>
                    )}
                  </div>
                </div>
              )}
              <h4 className="card-title">{auction.title}</h4>
              <h4 className="card-text">{auction.starting_price} €</h4>
            </div>
            <img src={auction.imgURl} className="img-card" alt="..." />
          </Link>
        )}
        {myAuction ? (
          <ButtonGroup className="edit-button-group">
            <Button
              className="delete"
              variant="outline-dark"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
              variant="dark"
              onClick={handleShowEditAuction}
              className="edit-button"
            >
              Edit
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </div>

      <EditAuction
        show={showModalEditAuction}
        onHide={handleCloseEditAuction}
        auction={auction}
      ></EditAuction>
    </Fragment>
  );
};

export default Card;
