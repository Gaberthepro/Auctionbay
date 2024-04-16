import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import "./profileSettings.css";
import userData from "../../../../services/userData";

function ProfileSettings({ showProfile, onHideProfile }: any) {
  var status: number;
  const user_id = localStorage.getItem("user_id");
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const notyf = new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user_id) {
        return;
      }
      try {
        const response = await userData(user_id);
        setEmail(response.data.email);
        setName(response.data.name);
        setSurname(response.data.surname);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };
    fetchUserData();
  }, [user_id]);

  const handleUpdate = async () => {
    const UpdateData = {
      name: Name,
      surname: Surname,
      email: Email
    };

    await axios
      .patch("http://localhost:3000/user/" + user_id, UpdateData)
      .then((response) => {
        status = response.status;
        notyf.success("User successfully updated");
      })
      .catch((error) => {
        notyf.error(error.response.data.message);
      });
    if (status == 200) {
      onHideProfile();
    } else {
      axios.get("http://localhost:3000/user/" + user_id).then((response) => {
        setEmail(response.data.email);
        setName(response.data.name);
        setSurname(response.data.surname);
      });
    }
  };

  return (
    <Fragment>
      <Modal show={showProfile} onHide={onHideProfile}>
        <Modal.Header>
          <Modal.Title>Profile settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div className="name-settings-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Name
                  </label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    id="surname-settings"
                    className="form-control"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-sm">
                <div className="surname-settings-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Surname
                  </label>
                </div>
                <input
                  type="text"
                  id="surname-settings"
                  className="form-control"
                  placeholder="Surname"
                  value={Surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="inputs">
            <div className="email-settings-label">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
            </div>

            <div id="modal-input-email" className="other-inputs">
              <input
                id="email-settings"
                type="text"
                className="form-control email-settings"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="link-settings">
            <Button className="link-settings-button" variant="link">
              Change password
            </Button>
          </div>
          <div className="link-settings">
            <Button className="link-settings-button" variant="link">
              Change profile picture
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="close" variant="secondary" onClick={onHideProfile}>
            Close
          </Button>
          <Button className="save" variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ProfileSettings;
