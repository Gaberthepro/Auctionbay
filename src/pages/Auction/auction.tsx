import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auction.css";
import { Auction } from "../../components/auciton-card/auction-card";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import AddAuctioon from "../../components/modals/addAuction/addAuction";
import ChangePass from "../../components/modals/profile/change-password/changePassword";
import ChangeProfilePic from "../../components/modals/profile/change-profile-picture/changeProfilePic";
import ProfileSettings from "../../components/modals/profile/profile-settings/profileSettings";
import Navbar from "../../components/navbar/navbar";
import { Notyf } from "notyf";
import FormatDateBid from "../../helpers/formatdateforbids";
interface Bid {
  bid_date: Date;
  price: string;
  user: {
    name: string;
    surname: string;
    imgURl: string;
  };
}

export function AuctionPage() {
  let { id } = useParams();
  let auction: Auction;
  let navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURl, setImgURl] = useState("");
  const [price, setPrice] = useState(0.0);
  const [auction_user_id, setAuctionUserId] = useState(0);
  const [countBids, setCountBids] = useState(0);
  const [bids, setBids] = useState<Bid[]>([]);
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });

  const [showModalAddAuction, setShowModalAddAuction] = useState(false);
  const handleShowModalAddAuction = () => setShowModalAddAuction(true);
  const handleCloseModalAddAuctio = () => setShowModalAddAuction(false);

  const [showModalProfileSettings, setShowModalProfileSettings] =
    useState(false);
  const handleShowModalProfileSettings = () => {
    setShowModalProfileSettings(true);
  };
  const handleCloseModalProfileSettings = () =>
    setShowModalProfileSettings(false);

  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const handleShowModalChangePass = () => setShowModalChangePass(true);
  const handleCloseModalChangePass = () => setShowModalChangePass(false);

  const [showModalChangePic, setShowModalChangePic] = useState(false);
  const handleShowModalChangePic = () => setShowModalChangePic(true);
  const handleCloseModalChangePic = () => setShowModalChangePic(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/bids/" + id)
      .then((response) => {
        console.log(response.data);
        setBids(response.data);
        setCountBids(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countBids]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auctions/one/" + id)
      .then((response) => {
        auction = response.data;
        setTitle(auction.title);
        setDescription(auction.description);
        setImgURl(auction.imgURl);
        setPrice(auction.starting_price);
        setAuctionUserId(auction.user.id);
      })
      .catch((error) => {
        console.log(error);
        navigate("/404");
      });
  }, [id]);

  const handleBid = async () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(now);

    const BidData = {
      price: price,
      bid_date: formattedDate,
      userId: user_id
    };

    if (user_id) {
      if (auction_user_id == parseInt(user_id)) {
        notyf.error("You cannot bid on your own auction");
      } else {
        await axios
          .post("http://localhost:3000/auctions/" + id + "/bid", BidData)
          .then(() => {
            notyf.success("You have submitted a bid on this auction");
            setCountBids(countBids + 1);
          })
          .catch(() => {
            notyf.error("You must bid more then current price");
          });
      }
    }
  };
  return (
    <Fragment>
      <Navbar
        onShowModalAddAuction={handleShowModalAddAuction}
        onShowModalProfile={handleShowModalProfileSettings}
      />
      <Container className="Container">
        <Row className="row-auction">
          <Col>
            <img className="image-auction" src={imgURl}></img>
          </Col>
          <Col className="auction">
            <Row className="auction-details">
              <h2>{title}</h2>
              <div className="desc-section">
                <p className="desc">{description}</p>
              </div>
              <div className="bid-section">
                <Form.Label className="bid-label" htmlFor="price">
                  Bid:
                </Form.Label>
                <Form.Control
                  type="number"
                  className="set-bid-price"
                  id="price"
                  min={0}
                  step=".01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
                <Button
                  className="btn-place-bid"
                  variant="primary"
                  onClick={handleBid}
                >
                  Place bid
                </Button>
              </div>
            </Row>
            <Row className="bid-history">
              <div>
                <h3>Bidding history ({countBids})</h3>
                {bids.slice(0, 10).map((bid, index) => (
                  <div key={index} className="bid-history-detail">
                    <img
                      className="bid-profile-img"
                      src={bid.user.imgURl}
                      alt="Bid Profile"
                    />
                    <p className="bid-p">
                      {bid.user.name} {bid.user.surname}
                    </p>
                    <div className="right-aligned">
                      <p className="bid-p">{FormatDateBid(bid.bid_date)}</p>
                      <Button className="bid-history-price" variant="primary">
                        {bid.price} €
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <AddAuctioon
        show={showModalAddAuction}
        onHide={handleCloseModalAddAuctio}
      ></AddAuctioon>
      <ProfileSettings
        showProfile={showModalProfileSettings}
        onHideProfile={handleCloseModalProfileSettings}
        onShowModalChangePass={handleShowModalChangePass}
        onShowModalChangePic={handleShowModalChangePic}
      ></ProfileSettings>
      <ChangePass
        showChangePass={showModalChangePass}
        onHideChangePass={handleCloseModalChangePass}
      ></ChangePass>
      <ChangeProfilePic
        showChangePic={showModalChangePic}
        onHideChangePic={handleCloseModalChangePic}
      ></ChangeProfilePic>
    </Fragment>
  );
}

export default AuctionPage;
