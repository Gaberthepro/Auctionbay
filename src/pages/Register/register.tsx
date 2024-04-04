import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./register.css";
import axios from "axios";

function register() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  const handleRegister = () => {
    if (Password !== RePassword) {
      alert("Password don't match")
    } else {
      const RegisterData = {
        name: Name,
        surname: Surname,
        email: Email,
        password: Password,
        imgURl: ""
      };
      axios
        .post("http://localhost:3000/user/", RegisterData)
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error:", error));
    }
  };

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
            <form onSubmit={handleRegister}>
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
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  aria-label="Surname"
                  value={Surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Password"
                    value={RePassword}
                    onChange={(e) => setRePassword(e.target.value)}
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
                  Log in
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
