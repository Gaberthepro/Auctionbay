import { Fragment } from "react/jsx-runtime";
import UserLocalStored from "../../services/localStoredData";

export function MyAuctions() {
  const user_id = localStorage.getItem("user_id");
  const user_data = UserLocalStored();

  return (
    <Fragment>
      <h1>My Auctions</h1>
    </Fragment>
  );
}

export default MyAuctions;
