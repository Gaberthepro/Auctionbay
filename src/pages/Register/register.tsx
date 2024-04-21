import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import "./register.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SaveDataToLocal from "../../services/saveDataToLocal";
import Me from "../../services/me";

function register() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");

  const [MessageContainerContent, setMessageContainerContent] = useState(
    "Please enter your details"
  );
  const [MessageContainerClass, setMessageContainerClass] =
    useState("message-container");

  const navigate = useNavigate();
  var Status: number;
  var errorMessage: string;

  const handleRegister = async (event: any) => {
    event.preventDefault();
    if (Password !== RePassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password don't match",
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      const RegisterData = {
        name: Name,
        surname: Surname,
        email: Email,
        password: Password,
        imgURl: ""
      };
      await axios
        .post("http://localhost:3000/user/signup", RegisterData)
        .then((response) => (Status = response.status))
        .catch(
          (error) => (
            (Status = error.response.status),
            (errorMessage = error.response.data.message)
          )
        );

      if (Status == 201) {
        const LoginData = {
          email: RegisterData.email,
          password: RegisterData.password
        };

        const now = new Date().getTime();
        axios
          .post("http://localhost:3000/login", LoginData)
          .then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("setupTime", JSON.stringify(now));
          })
          .catch((error) => console.error("Error:", error));
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          timer: 1000,
          showConfirmButton: false
        });
        setTimeout(async () => {
          const token = localStorage.getItem("access_token");
          const data = await Me(token);
          const user_id = (await data).data.id;
          localStorage.setItem("user_id", user_id);
          await SaveDataToLocal(user_id);
          navigate("/Home");
        }, 1000);
      } else {
        setMessageContainerClass("message-container--error");
        setMessageContainerContent(errorMessage[0]);
      }
    }
  };

  return (
    <Fragment>
      <div className="container text-center">
        <div className="row">
          <div className="col-12 col-md-7 d-none d-md-block">
            <img src="src/assets/images/login.png"></img>
          </div>
          <div id="login" className="col-12 col-md-5">
            <div className="logo">
              <img
                src="src/assets/images/logo.png"
                alt="Avatar"
                className="avatar"
              />
            </div>
            <div className="Hello">
              <h1>Hello!</h1>
              <div className={MessageContainerClass}>
                <p>{MessageContainerContent}</p>
              </div>
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
                    aria-label="Email"
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
                    aria-label="Password"
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
                    placeholder="Reapet Password"
                    aria-label="Email"
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
