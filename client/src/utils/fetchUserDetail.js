import Axios from "./Axios";
const fetchUserDetails = async () => {
  try {
    const res = await Axios.get(
      "https://ecomart-production-1397.up.railway.app/api/user/get-user-details"
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails;
