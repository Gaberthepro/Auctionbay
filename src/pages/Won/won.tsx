import { Fragment } from "react/jsx-runtime";
import UserLocalStored from "../../services/localStoredData";

export function Won() {
  const user_id = localStorage.getItem("user_id");
  const user_data = UserLocalStored();

  return (
    <Fragment>
      <h1>Won</h1>
    </Fragment>
  );
}

export default Won;
