import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import Me from "../../services/me";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAuctioon from "../../components/modals/addAuction";
export function Home() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const token = localStorage.getItem("access_token");

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    Me(token)
      .then((response) => {
        setName(response.data.name);
        setSurname(response.data.surname);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, [token]);

  return (
    <Fragment>
      <Navbar onShowModal={handleShowModal} />
      <h1>
        Hello {Name} {Surname}!
      </h1>
      <AddAuctioon show={showModal} onHide={handleCloseModal}></AddAuctioon>
    </Fragment>
  );
}

export default Home;
