import { Fragment } from "react/jsx-runtime";
import "./auction-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonGroup } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from "axios";

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

  const targetDate: any = new Date(auction.end_date);
  const now: any = new Date();
  const diffInHours = Math.round((targetDate - now) / 1000 / 60 / 60);

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

  return (
    <Fragment>
      <div className="card">
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
          <h4 className="card-title">{auction.title}</h4>
          <h4 className="card-text">{auction.starting_price} €</h4>
        </div>
        <img src={auction.imgURl} className="img-card" alt="..." />
        {myAuction ? (
          <ButtonGroup className="edit-button-group">
            <Button
              className="delete"
              variant="outline-dark"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button variant="dark" className="edit-button">
              Edit
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};

export default Card;
