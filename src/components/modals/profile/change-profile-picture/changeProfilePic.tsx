import { Fragment, useRef, useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Modal, Button } from "react-bootstrap";
import "./changeProfilePic.css";
import UserLocalStored from "../../../../services/localStoredData";
import S3 from "react-aws-s3-typescript";
import SaveDataToLocal from "../../../../services/saveDataToLocal";

function ChangeProfilePic({ showChangePic, onHideChangePic }: any) {
  const user_data = UserLocalStored();
  const [img, setImg] = useState(user_data.imgURl);
  const [profileFile, setprofileFile] = useState(null);
  var preview: string;
  var status: number;
  const user_id = localStorage.getItem("user_id");
  const inputFile: any = useRef(null);
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
        setImg(preview);
        setprofileFile(files[0]);
      } else {
        notyf.error("this is not valid file(png, jpg, jpeg)");
      }
    }
  };

  const handleAddImg = () => {
    inputFile.current.click();
  };

  const handleChangeProfilePic = async () => {
    let imageUrl = null;
    const ReactS3Client = new S3({
      accessKeyId: "AKIAYRUDS2PLK4KNBQ4Q",
      secretAccessKey: "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",
      bucketName: "skilup-mentor-auctionbay",
      region: "eu-central-1",
      s3Url: "https://skilup-mentor-auctionbay.s3.eu-central-1.amazonaws.com"
    });

    if (profileFile != null) {
      try {
        const data = await ReactS3Client.uploadFile(profileFile);
        imageUrl = data.location;
      } catch (err) {
        notyf.error("Avatar must be provided");
      }
    }

    const profileImgData = {
      imgUrl: imageUrl,
      user_id: user_id
    };

    await axios
      .put("http://localhost:3000/user/update-profile-img", profileImgData)
      .then((response) => {
        status = response.status;
      })
      .catch((error) => {
        notyf.error(error.response.data.message);
      });

    if (status == 200) {
      SaveDataToLocal(user_id);
      notyf.success("Profile picture successfully changed ");
      setprofileFile(null);
      setTimeout(() => {
        onHideChangePic();
      }, 500);
    }
  };

  const handleClose = () => {
    setImg(user_data.imgURl);
    onHideChangePic();
  };

  return (
    <Fragment>
      <Modal show={showChangePic} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Change profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body changePic">
          <div>
            <img src={img} alt="Avatar" className="avatar_change_profile" />
            <input
              style={{ display: "none" }}
              ref={inputFile}
              onChange={handleFileUpload}
              type="file"
            />
          </div>
          <div>
            <Button
              className="addButton"
              variant="outline-dark"
              onClick={handleAddImg}
            >
              Upload new picture
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="save"
            variant="primary"
            onClick={handleChangeProfilePic}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ChangeProfilePic;