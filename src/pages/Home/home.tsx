import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  });
  return (
    <Fragment>
      <Navbar />
      <h1>Hello {Name} {Surname}</h1>
    </Fragment>
  );
}

export default Home;
