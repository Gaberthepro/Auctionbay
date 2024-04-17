const UserLocalStored = () => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString !== null) {
    const storedUserDataArray = JSON.parse(userDataString);
    return storedUserDataArray;
  } else {
    return console.log("No user data found in localStorage.");
  }
};

export default UserLocalStored;
