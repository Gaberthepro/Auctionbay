import { Fragment, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import S3 from "react-aws-s3-typescript";
import { Auction } from "../../auciton-card/auction-card";
import FormatDate from "../../../helpers/formatdate";

interface EditAuctionProps {
  show: boolean;
  onHide: () => void;
  auction?: Auction;
}

const EditAuction: React.FC<EditAuctionProps> = ({ show, onHide, auction }) => {
  const [PreviewImg, setPreviewImg] = useState(auction?.imgURl);
  const [ImgFile, setImgFile] = useState(null);
  const [Title, setTitle] = useState(auction?.title);
  const [Description, setDescription] = useState(auction?.description);
  const [End_date, setEndDate] = useState("");
  useEffect(() => {
    if (auction?.end_date) {
      const formattedDate = FormatDate(auction.end_date);
      setEndDate(formattedDate);
    }
  }, [auction?.end_date]);
  const [addImgButton, setAddImgButton] = useState(true);
  const [Trash, setTrashButton] = useState(false);
  const inputFile: any = useRef(null);
  let preview: any;
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
    let imageUrl = auction?.imgURl;
    //AWS S3 shranjevanje
    if (ImgFile != null) {
      const ReactS3Client = new S3({
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY as string,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string,
        bucketName: import.meta.env.VITE_AWS_BUCKET_NAME as string,
        region: import.meta.env.VITE_AWS_REGION as string,
        s3Url: import.meta.env.VITE_AWS_S3_URL as string
      });

      if (ImgFile != null) {
        try {
          const data = await ReactS3Client.uploadFile(ImgFile);
          imageUrl = data.location;
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (PreviewImg == "https://color-hex.org/colors/f6f6f4.png") {
      notyf.error("Pleas provide img");
      setTitle(auction?.title);
      setDescription(auction?.description);
      if (auction?.end_date) {
        const formattedDate = FormatDate(auction.end_date);
        setEndDate(formattedDate);
      }
      setPreviewImg(auction?.imgURl);
      setImgFile(null);
      onHide();
      return;
    }

    const AuctionData = {
      title: Title,
      description: Description,
      end_date: End_date,
      imgURl: imageUrl
    };

    await axios
      .put("http://localhost:3000/me/auction/" + auction?.id, AuctionData)
      .then((response) => (Status = response.status))
      .catch((error) => {
        notyf.error(error.response.data.message[0]);
      });

    if (Status == 200) {
      notyf.success("Auction succesfuly updatd");
      setTitle(auction?.title);
      setDescription(auction?.description);
      if (auction?.end_date) {
        const formattedDate = FormatDate(auction.end_date);
        setEndDate(formattedDate);
      }
      setPreviewImg(auction?.imgURl);
      setImgFile(null);
      setTrashButton(false);
      setAddImgButton(true);
      onHide();
      location.reload();
    }
  };

  const handleDiscard = () => {
    setTitle(auction?.title);
    setDescription(auction?.description);
    if (auction?.end_date) {
      const formattedDate = FormatDate(auction.end_date);
      setEndDate(formattedDate);
    }
    setPreviewImg(auction?.imgURl);
    setImgFile(null);
    setTrashButton(false);
    setAddImgButton(true);
    onHide();
  };

  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Edit Auction</Modal.Title>
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
          <div className="end-date-label">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              End date
            </label>
          </div>
          <input
            type="datetime-local"
            className="form-control date"
            value={End_date}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={handleDiscard}>
            Discard changes
          </Button>
          <Button className="save" variant="primary" onClick={handleAddAuction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditAuction;
