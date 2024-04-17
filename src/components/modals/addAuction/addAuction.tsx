import { Fragment, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import "./addAuction.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import S3 from "react-aws-s3-typescript";

function AddAuctioon({ show, onHide }: any) {
  const [PreviewImg, setPreviewImg] = useState(
    "https://color-hex.org/colors/f6f6f4.png"
  );
  const [ImgFile, setImgFile] = useState(null);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Starting_price, setStartingPrice] = useState(0.0);
  const [Date, setEndDate] = useState("");
  const [addImgButton, setAddImgButton] = useState(false);
  const [Trash, setTrashButton] = useState(true);
  const user_id = localStorage.getItem("user_id");
  const inputFile: any = useRef(null);
  let preview;
  var Status: number;
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });

  const handleFileUpload = async (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;
      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
        preview = await URL.createObjectURL(e.target.files[0]);
        setPreviewImg(preview);
        setAddImgButton(true);
        setTrashButton(false);
        setImgFile(files[0]);
      } else {
        notyf.error("this is not valid file(png, jpg, jpeg)");
      }
    }
  };

  const handleAddImg = () => {
    inputFile.current.click();
  };

  const handleCancelImg = () => {
    setPreviewImg("https://color-hex.org/colors/f6f6f4.png");
    setAddImgButton(false);
    setTrashButton(true);
  };

  const handleAddAuction = async () => {
    let imageUrl = null;
    const ReactS3Client = new S3({
      accessKeyId: "AKIAYRUDS2PLK4KNBQ4Q",
      secretAccessKey: "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",
      bucketName: "skilup-mentor-auctionbay",
      region: "eu-central-1",
      s3Url: "https://skilup-mentor-auctionbay.s3.eu-central-1.amazonaws.com"
    });

    if (ImgFile != null) {
      try {
        const data = await ReactS3Client.uploadFile(ImgFile);
        imageUrl = data.location;
      } catch (err) {
        console.log(err);
      }
    }

    const AuctionData = {
      title: Title,
      description: Description,
      starting_price: Starting_price,
      end_date: Date,
      imgURl: imageUrl,
      userId: user_id
    };

    await axios
      .post("http://localhost:3000/me/auction/", AuctionData)
      .then((response) => (Status = response.status))
      .catch((error) => {
        notyf.error(error.response.data.message[0]);
      });

    if (Status == 201) {
      notyf.success("Auction succesfuly added");
      setTitle("");
      setDescription("");
      setStartingPrice(0);
      setEndDate("");
      setPreviewImg("https://color-hex.org/colors/f6f6f4.png");
      setImgFile(null);
      onHide();
    }
  };

  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Add auction</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="image-container">
            <Image src={PreviewImg} fluid className="image" />
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
            />
            <Button
              className="overlay-button"
              variant="outline-light"
              onClick={handleAddImg}
              hidden={addImgButton}
            >
              Add image
            </Button>
            <Button className="trash" hidden={Trash} onClick={handleCancelImg}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
          <div className="inputs">
            <div className="title-label">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
            </div>

            <div id="modal-input" className="other-inputs">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="inputs">
            <div className="title-label">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Description
              </label>
            </div>

            <div className="textarea">
              <textarea
                className="form-control"
                placeholder="Description"
                rows={4}
                cols={50}
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="starting-price-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Starting price
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control price"
                    min={0}
                    step=".1"
                    placeholder="Starting price"
                    value={Starting_price}
                    onChange={(e) =>
                      setStartingPrice(parseFloat(e.target.value))
                    }
                  />
                  <span className="input-group-text euro">€</span>
                </div>
              </div>
              <div className="col-sm">
                <div className="end-date-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    End date
                  </label>
                </div>
                <input
                  type="datetime-local"
                  className="form-control date"
                  placeholder="End date"
                  value={Date}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="save" variant="primary" onClick={handleAddAuction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default AddAuctioon;
