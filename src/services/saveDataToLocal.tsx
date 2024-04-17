import userData from "./userData";

const SaveDataToLocal = async (user_id:any) => {
    if (!user_id) {
      return;
    }
    try {
      const response = await userData(user_id);
      localStorage.setItem("userData", JSON.stringify(response.data));
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  export default SaveDataToLocal