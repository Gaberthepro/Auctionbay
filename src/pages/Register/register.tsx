import { Fragment } from "react/jsx-runtime";
import "./register.css";

function register() {
  return (
    <Fragment>
      <div className="container text-center">
        <div className="row">
          <div className="col-7">
            <img src="src/assets/images/login.png"></img>
          </div>
          <div id="login" className="col-5">
            <div className="logo">
              <img
                src="src/assets/images/logo.png"
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="Hello">
              <h1>Hello!</h1>
              <p>Please enter your details</p>
            </div>
            <form>
              <div className="name-label">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Surname
                </label>
              </div>
              <div className="name-input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  aria-label="Name"
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  aria-label="Surname"
                />
              </div>

              <div className="inputs">
                <div className="email-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email
                  </label>
                </div>

                <div className="other-inputs">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="inputs">
                <div className="email-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Password
                  </label>
                </div>

                <div className="other-inputs">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="inputs">
                <div className="email-label">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Reapet Password
                  </label>
                </div>

                <div className="other-inputs">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div id="submit" className="d-grid gap-2 col-8 mx-auto">
                <button className="btn btn-warning" type="submit">
                  Sign up
                </button>
              </div>
            </form>
            <div className="toLogin">
              <p>
                Already have an account?{" "}
                <a className="link-opacity-100" href="/Login">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default register;
