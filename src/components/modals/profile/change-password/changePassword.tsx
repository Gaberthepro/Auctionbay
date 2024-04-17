import { Fragment, useState } from "react";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Form, InputGroup, Modal, Button } from "react-bootstrap";
import "./changePassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ChangePass({ showChangePass, onHideChangePass }: any) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setNewRePass] = useState("");
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

  const [showOldPass, setShowOldPass] = useState("password");
  const [iconOldPass, setIconOldPass] = useState(
    <FontAwesomeIcon icon={faEye} />
  );

  const currentPass = () => {
    if (showOldPass == "password") {
      setShowOldPass("text");
      setIconOldPass(<FontAwesomeIcon icon={faEyeSlash} />);
    } else {
      setShowOldPass("password");
      setIconOldPass(<FontAwesomeIcon icon={faEye} />);
    }
  };

  const [showNewPass, setShowNewPass] = useState("password");
  const [iconNewPass, setIconNewPass] = useState(
    <FontAwesomeIcon icon={faEye} />
  );

  const NewPass = () => {
    if (showNewPass == "password") {
      setShowNewPass("text");
      setIconNewPass(<FontAwesomeIcon icon={faEyeSlash} />);
    } else {
      setShowNewPass("password");
      setIconNewPass(<FontAwesomeIcon icon={faEye} />);
    }
  };

  const [showRePass, setShowRePass] = useState("password");
  const [iconRePass, setIconRePass] = useState(
    <FontAwesomeIcon icon={faEye} />
  );

  const RePass = () => {
    if (showRePass == "password") {
      setShowRePass("text");
      setIconRePass(<FontAwesomeIcon icon={faEyeSlash} />);
    } else {
      setShowRePass("password");
      setIconRePass(<FontAwesomeIcon icon={faEye} />);
    }
  };

  const handleChangePassword = async () => {
    if (newPass != rePass) {
      notyf.error("Passwords don't match");
    } else {
      const changePassData = {
        old_password: oldPass,
        new_password: newPass,
        user_id: user_id
      };
      await axios
        .put("http://localhost:3000/me/update-password", changePassData)
        .then((response) => {
          status = response.status;
        })
        .catch((error) => {
          notyf.error(error.response.data.message);
        });

      if (status == 200) {
        notyf.success("Password successfully updated");
        setOldPass("");
        setNewPass("");
        setNewRePass("");
        onHideChangePass();
      }
    }
  };
  

  return (
    <Fragment>
      <Modal show={showChangePass} onHide={onHideChangePass}>
        <Modal.Header>
          <Modal.Title>Change password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Current password
              </label>
            </div>
            <InputGroup>
              <Form.Control
                className="pass-input"
                type={showOldPass}
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
              />
              <InputGroup.Text className="eye" onClick={currentPass}>
                {iconOldPass}
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div className="password">
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                New password
              </label>
            </div>

            <InputGroup>
              <Form.Control
                className="pass-input"
                type={showNewPass}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
              <InputGroup.Text className="eye" onClick={NewPass}>
                {iconNewPass}
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div className="password">
            <div>
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Repeat new password
              </label>
            </div>
            <InputGroup>
              <Form.Control
                className="pass-input"
                type={showRePass}
                value={rePass}
                onChange={(e) => setNewRePass(e.target.value)}
              />
              <InputGroup.Text className="eye" onClick={RePass}>
                {iconRePass}
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close"
            variant="secondary"
            onClick={onHideChangePass}
          >
            Close
          </Button>
          <Button
            className="save"
            variant="primary"
            onClick={handleChangePassword}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ChangePass;
