import { Fragment } from "react/jsx-runtime";
import UserLocalStored from "../../services/localStoredData";

export function Bidding() {
  const user_id = localStorage.getItem("user_id");
  const user_data = UserLocalStored();

  return (
    <Fragment>
      <h1>Bidding</h1>
    </Fragment>
  );
}

export default Bidding;
