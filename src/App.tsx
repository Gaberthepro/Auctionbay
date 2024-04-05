import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Card from "./components/auciton-card/auction-card";
import Landing from "./pages/Landing/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
