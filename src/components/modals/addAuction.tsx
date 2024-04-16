import { Fragment, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import "./addAuction.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Me from "../../services/me";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function AddAuctioon({ show, onHide }: any) {
  const [Img, setImg] = useState("https://color-hex.org/colors/f6f6f4.png");
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Starting_price, setStartingPrice] = useState(0.0);
  const [Date, setEndDate] = useState("");
  const [addImgButton, setAddImgButton] = useState(false);
  const [Trash, setTrashButton] = useState(true);
  const [user_id, setUserId] = useState();
  const token = localStorage.getItem("access_token");
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

  useEffect(() => {
    Me(token)
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [token]);

  const handleFileUpload = async (e: any) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType);
      if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
        preview = await URL.createObjectURL(e.target.files[0]);
        setImg(preview);
        setAddImgButton(true);
        setTrashButton(false);
      } else {
        alert("this is not valid file(png, jpg, jpeg)");
      }
    }
  };

  const handleAddImg = () => {
    inputFile.current.click();
  };

  const handleCancelImg = () => {
    setImg("https://color-hex.org/colors/f6f6f4.png");
    setAddImgButton(false);
    setTrashButton(true);
  };

  const handleAddAuction = async () => {
    const AuctionData = {
      title: Title,
      description: Description,
      starting_price: Starting_price,
      end_date: Date,
      imgURl: "https://color-hex.org/colors/f6f6f4.png",
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
      setImg("https://color-hex.org/colors/f6f6f4.png");
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
            <Image src={Img} fluid className="image" />
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
                  placeholder="Title"
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
