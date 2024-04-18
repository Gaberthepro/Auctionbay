import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import Me from "../../services/me";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAuctioon from "../../components/modals/addAuction/addAuction";
import ProfileSettings from "../../components/modals/profile/profile-settings/profileSettings";
import ChangePass from "../../components/modals/profile/change-password/changePassword";
import ChangeProfilePic from "../../components/modals/profile/change-profile-picture/changeProfilePic";
import UserLocalStored from "../../services/localStoredData";
import Auctions from "../Auctions/auctions";

export function Home() {
  const token = localStorage.getItem("access_token");
  const user_id = localStorage.getItem("user_id");
  const user_data = UserLocalStored();
  var onProfile: boolean = true;

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

  const [showModalChangePic, setShowModalChangePic] = useState(false);
  const handleShowModalChangePic = () => setShowModalChangePic(true);
  const handleCloseModalChangePic = () => setShowModalChangePic(false);

  useEffect(() => {
    Me(token)
      .then((response) => {
        localStorage.setItem("user_id", response.data.id);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [token]);

  var currentURL = window.location.href;

  if (currentURL.toLowerCase().includes("home")) {
    onProfile = true;
  } else {
    onProfile = false;
  }

  return (
    <Fragment>
      <Navbar
        onShowModalAddAuction={handleShowModalAddAuction}
        onShowModalProfile={handleShowModalProfileSettings}
      />
      {onProfile ? (
        <h1>
          Hello {user_data.name} {user_data.surname}!
        </h1>
      ) : (
          <Auctions></Auctions>
      )}

      <AddAuctioon
        show={showModalAddAuction}
        onHide={handleCloseModalAddAuctio}
      ></AddAuctioon>
      <ProfileSettings
        showProfile={showModalProfileSettings}
        onHideProfile={handleCloseModalProfileSettings}
        onShowModalChangePass={handleShowModalChangePass}
        onShowModalChangePic={handleShowModalChangePic}
      ></ProfileSettings>
      <ChangePass
        showChangePass={showModalChangePass}
        onHideChangePass={handleCloseModalChangePass}
      ></ChangePass>
      <ChangeProfilePic
        showChangePic={showModalChangePic}
        onHideChangePic={handleCloseModalChangePic}
      ></ChangeProfilePic>
    </Fragment>
  );
}

export default Home;
