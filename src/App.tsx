import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Landing from "./pages/Landing/landing";
import Home from "./pages/Home/home";
import PrivateRoutes from "./utils/PrivateRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const currentTime = new Date().getTime();
  const setupTime = localStorage.getItem("setupTime");
  if (setupTime != null) {
    const elapsedTime = currentTime - parseInt(setupTime);
    const oneHour = 60 * 60 * 1000;
    if (elapsedTime >= oneHour) {
      localStorage.clear();
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Auctions" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
