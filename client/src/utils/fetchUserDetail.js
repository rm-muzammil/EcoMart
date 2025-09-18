import Axios from "./Axios";
const fetchUserDetails = async () => {
  try {
    const res = await Axios("http://localhost:8080/api/user/get-user-details");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
