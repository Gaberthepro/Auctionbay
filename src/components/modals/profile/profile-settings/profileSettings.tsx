import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./addAuction.css";
import Me from "../../../../services/me";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

function ProfileSettings({ show, onHide }: any) {
  const [user_id, setUserId] = useState();
  const token = localStorage.getItem("access_token");
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

  return (
    <Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Add auction</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body"></Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="save" variant="primary" onClick={onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ProfileSettings;
