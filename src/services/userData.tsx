import axios from "axios";

const userData = (ID:any)=>{
return axios.get('http://localhost:3000/user/'+ID)
}

export default userData;
