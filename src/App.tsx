import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={""} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
