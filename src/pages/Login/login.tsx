import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Me from "../../services/me";
import SaveDataToLocal from "../../services/saveDataToLocal";
import { Notyf } from "notyf";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  var Status: number;
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: "center",
      y: "top"
    },
    ripple: false
  });
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const LoginData = {
      email: Email,
      password: Password
    };

    const now = new Date().getTime();
    await axios
      .post("http://localhost:3000/login", LoginData)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("setupTime", JSON.stringify(now));
      })
      .catch((error) => {
        Status = error.response.data.statusCode;
        notyf.error("Unauthorized");
      });

    if (Status != 401) {
      setTimeout(async () => {
        const token = localStorage.getItem("access_token");
        const data = await Me(token);
        const user_id = (await data).data.id;
        localStorage.setItem("user_id", user_id);
        await SaveDataToLocal(user_id);
        notyf.success("Welcome back");
        navigate("/Home");
      }, 200);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect email or password",
        timer: 1500,
        showConfirmButton: false
      });
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
