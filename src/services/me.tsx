import axios from "axios";

const Me = (token: any) => {
  return axios.get("http://localhost:3000/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default Me;
