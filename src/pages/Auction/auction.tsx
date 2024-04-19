import { Fragment } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auction.css";
import { Auction } from "../../components/auciton-card/auction-card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function AuctionPage() {
  let { id } = useParams();
  let auction: Auction;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgURl, setImgURl] = useState("");
  const [price, setPrice] = useState(0);
  const [auction_user_id, setAuctionUserId] = useState(0);

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
      });
  });

  return (
    <Fragment>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <img src={imgURl}></img>
      <h2>{price}</h2>
    </Fragment>
  );
}

export default AuctionPage;
