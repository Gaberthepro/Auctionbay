import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import Me from "../../services/me";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAuctioon from "../../components/modals/addAuction/addAuction";
import ProfileSettings from "../../components/modals/profile/profile-settings/profileSettings";
import ChangePass from "../../components/modals/profile/change-password/changePassword";

export function Home() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const token = localStorage.getItem("access_token");

  const [showModalAddAuction, setShowModalAddAuction] = useState(false);
  const handleShowModalAddAuction = () => setShowModalAddAuction(true);
  const handleCloseModalAddAuctio = () => setShowModalAddAuction(false);

  const [showModalProfileSettings, setShowModalProfileSettings] =
    useState(false);
  const handleShowModalProfileSettings = () => {
    setShowModalProfileSettings(true);
  };
  const handleCloseModalProfileSettings = () =>
    setShowModalProfileSettings(false);

  const [showModalChangePass, setShowModalChangePass] = useState(false);
  const handleShowModalChangePass = () => setShowModalChangePass(true);
  const handleCloseModalChangePass = () => setShowModalChangePass(false);

  useEffect(() => {
    Me(token)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
        localStorage.setItem("user_id", response.data.id);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [token]);

  return (
    <Fragment>
      <Navbar
        onShowModalAddAuction={handleShowModalAddAuction}
        onShowModalProfile={handleShowModalProfileSettings}
      />
      <h1>
        Hello {Name} {Surname}!
      </h1>
      <AddAuctioon
        show={showModalAddAuction}
        onHide={handleCloseModalAddAuctio}
      ></AddAuctioon>
      <ProfileSettings
        showProfile={showModalProfileSettings}
        onHideProfile={handleCloseModalProfileSettings}
        onShowModalChangePass={handleShowModalChangePass}
      ></ProfileSettings>
      <ChangePass
        showChangePass={showModalChangePass}
        onHideChangePass={handleCloseModalChangePass}
      ></ChangePass>
    </Fragment>
  );
}

export default Home;
