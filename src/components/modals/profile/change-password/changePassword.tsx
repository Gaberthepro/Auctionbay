import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function ChangePass({ showChangePass, onHideChangePass }: any) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
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
      <Modal show={showChangePass} onHide={showChangePass}>
        <Modal.Header>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body"></Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={onHideChangePass}>
            Close
          </Button>
          <Button className="save" variant="primary" >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ChangePass;
