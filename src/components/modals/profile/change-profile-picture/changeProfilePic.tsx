import { Fragment, useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Modal, Button } from "react-bootstrap";
import "./changeProfilePic.css";

function ChangeProfilePic({ showChangePic, onHideChangePic }: any) {
  var status: number;
  const user_id = localStorage.getItem("user_id");
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });

  

  return (
    <Fragment>
      <Modal show={showChangePic} onHide={showChangePic}>
        <Modal.Header>
          <Modal.Title>Change profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body changePic">
          <img src="" alt="Avatar" />
          <Button className="addButton" variant="outline-dark">
            Upload new picture
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close"
            variant="secondary"
            onClick={onHideChangePic}
          >
            Close
          </Button>
          <Button className="save" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ChangeProfilePic;
