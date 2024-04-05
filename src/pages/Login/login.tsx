import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event: any) => {
    event.preventDefault();
    const LoginData = {
      email: Email,
      password: Password
    };

    const now = new Date().getTime();
    axios
      .post("http://localhost:3000/login", LoginData)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("setupTime", JSON.stringify(now));
      })
      .catch((error) => console.error("Error:", error));
    setTimeout(() => {
      navigate("/Home");
    }, 1000);
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
              <h1>Welcome back!</h1>
              <p>Please enter your details</p>
            </div>
            <form onSubmit={handleLogin}>
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
                  <p className="forgot">Forgot password?</p>
                </div>
              </div>
              <div id="submit" className="d-grid gap-2 col-8 mx-auto">
                <button className="btn btn-warning" type="submit">
                  Login
                </button>
              </div>
            </form>
            <div className="toRegister">
              <p>
                Don't have an account?{" "}
                <a className="link-opacity-100" href="/Register">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Login;
