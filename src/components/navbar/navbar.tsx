import { Fragment } from "react/jsx-runtime";
import "./navbar.css";

export function Navbar() {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <img
                  src="src/assets/images/logo.png"
                  alt="Avatar"
                  className="avatar"
                />
              </li>
            </ul>
            <span className="navbar-text">
              <a href="/Login" className="btn btn-link">
                Log in
              </a>
              <span className="gap">or</span>
              <a href="/Register" className="btn btn-dark">
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Navbar;
