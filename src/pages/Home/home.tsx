import { Fragment } from "react/jsx-runtime";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import Me from "../../services/me";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAuctioon from "../../components/modals/addAuction/addAuction";
export function Home() {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const token = localStorage.getItem("access_token");

  const [showModalAddAuction, setShowModalAddAuction] = useState(false);

  const handleShowModalAddAuction = () => setShowModalAddAuction(true);
  const handleCloseModalAddAuctio = () => setShowModalAddAuction(false);

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
      <Navbar onShowModal={handleShowModalAddAuction} />
      <h1>
        Hello {Name} {Surname}!
      </h1>
      <AddAuctioon show={showModalAddAuction} onHide={handleCloseModalAddAuctio}></AddAuctioon>
    </Fragment>
  );
}

export default Home;
