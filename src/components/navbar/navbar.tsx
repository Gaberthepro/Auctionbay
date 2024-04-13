import { Fragment } from "react/jsx-runtime";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Me from "../../services/me";
import userData from "../../services/userData";

export function Navbar() {
  var isLoggedIn: boolean;
  var onLanding: boolean;
  var currentURL = window.location.href;
  var parts = currentURL.split("/");
  var endpoint = parts[parts.length - 1];
  const token = localStorage.getItem("access_token");
  const [user_id, setUserID] = useState();
  const [img, setImage] = useState(
    "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    Me(token)
      .then((response) => {
        setUserID(response.data.id);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user_id) {
        return;
      }
      try {
        const response = await userData(user_id);
        setImage(response.data.imgURl);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };
    fetchUserData();
  }, [user_id]);

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

  return (
    <Fragment>
      {onLanding ? (
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <img
                    src="src/assets/images/logo.png"
                    alt="Avatar"
                    className="avatar-logo"
                  />
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
          <img
            src="src/assets/images/logo.png"
            alt="Avatar"
            className="avatar-logo"
          />
          <div
            className="btn-group  btn-group-lg"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
            />
            <label className="btn btn-outline-dark" htmlFor="btnradio1">
              Auctions
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              defaultChecked
            />
            <label className="btn btn-outline-dark" htmlFor="btnradio2">
              Profile
            </label>
          </div>
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
                      <span className="dot">
                        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                      </span>
                    </div>
                    <div className="col">
                      <img
                        src={img}
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
