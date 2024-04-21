import { Fragment } from "react/jsx-runtime";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHouse,
  faPlus,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import UserLocalStored from "../../services/localStoredData";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

export function Navbar({ onShowModalAddAuction, onShowModalProfile }: any) {
  var isLoggedIn: boolean;
  var onLanding: boolean;
  var onHomeSwitch: boolean = true;
  var currentURL = window.location.href;
  var parts = currentURL.split("/");
  var endpoint = parts[parts.length - 1];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const user_data = UserLocalStored();
  const navigate = useNavigate();

  if (localStorage.getItem("access_token") === null) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  if (endpoint == "") {
    onLanding = true;
  } else if (endpoint == "home") {
    onLanding = false;
  } else {
    onLanding = false;
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = (event: any) => {
    if (!event.target.closest(".dropdown-toggle")) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.assign("/");
  };

  const handleToAuctioon = () => {
    navigate("/Auctions");
  };

  const handleToProfile = () => {
    navigate("/Home");
  };

  if (currentURL.toLowerCase().includes("auction")) {
    onHomeSwitch = false;
  }

  return (
    <Fragment>
      {onLanding ? (
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <img src={Logo} alt="Avatar" className="avatar-logo" />
                </li>
              </ul>
              {isLoggedIn ? (
                <span className="navbar-text">
                  <a href="/Home" className="btn btn-link">
                    Log in
                  </a>
                  <span className="gap">or</span>
                  <a href="/Home" className="btn btn-dark">
                    Sign Up
                  </a>
                </span>
              ) : (
                <span className="navbar-text">
                  <a href="/Login" className="btn btn-link">
                    Log in
                  </a>
                  <span className="gap">or</span>
                  <a href="/Register" className="btn btn-dark">
                    Sign Up
                  </a>
                </span>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
          <img src={Logo} alt="Avatar" className="avatar-logo" />
          {onHomeSwitch ? (
            <div
              className="btn-group  btn-group-lg switcher"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                onClick={handleToAuctioon}
              />
              <label
                className="btn btn-outline-dark home"
                htmlFor="btnradio1"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".25rem"
                }}
              >
                <FontAwesomeIcon icon={faHouse} />
                Auctions
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                onClick={handleToProfile}
                defaultChecked
              />
              <label
                className="btn btn-outline-dark"
                htmlFor="btnradio2"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".25rem"
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </label>
            </div>
          ) : (
            <div
              className="btn-group  btn-group-lg switcher"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                onClick={handleToAuctioon}
                defaultChecked
              />
              <label
                className="btn btn-outline-dark home"
                htmlFor="btnradio1"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".25rem"
                }}
              >
                <FontAwesomeIcon icon={faHouse} />
                Auctions
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                onClick={handleToProfile}
              />
              <label
                className="btn btn-outline-dark"
                htmlFor="btnradio2"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".25rem"
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                Profile
              </label>
            </div>
          )}
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsingNavbar3"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
              <li className="nav-item">
                <div className="container">
                  <div className="row row-profile">
                    <div className="col">
                      <a type="button">
                        <span className="dot" onClick={onShowModalAddAuction}>
                          <FontAwesomeIcon
                            className="plus-icon"
                            icon={faPlus}
                          />
                        </span>
                      </a>
                    </div>
                    <div className="col">
                      <img
                        src={user_data.imgURl}
                        alt="Avatar"
                        className="avatar dropdown-toggle"
                        onClick={toggleDropdown}
                      />
                    </div>
                  </div>
                </div>
                {isDropdownVisible && (
                  <div
                    className="dropdown-menu show"
                    style={{ marginLeft: "-4rem", textAlign: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      style={{ marginTop: "0.5rem" }}
                      onClick={onShowModalProfile}
                    >
                      <span style={{ marginRight: "0.5rem" }}>
                        <FontAwesomeIcon icon={faGear} />
                      </span>
                      Profile settings
                    </button>
                    <button
                      style={{ margin: "0.5rem" }}
                      type="button"
                      className="btn btn-outline-light"
                      onClick={handleLogOut}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      )}
    </Fragment>
  );
}
export default Navbar;
