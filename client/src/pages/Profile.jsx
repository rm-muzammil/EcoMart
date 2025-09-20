import { useDispatch, useSelector } from "react-redux";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { setUserDetails, updatedAvatar } from "../store/userSlice";
import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetail";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  // 🔥 Sync userData with Redux state whenever user changes
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
    console.log("user avatar", user.avatar);
  }, [user]);

  if (!user) return <p className="text-gray-600">Loading profile...</p>;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios.put("/user/update-user", userData);
      const { data: resData } = res;

      if (resData.success) {
        toast.success(resData.message);

        // Refetch latest user details after update
        const updatedUser = await fetchUserDetails();
        dispatch(setUserDetails(updatedUser.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h1>

      {/* Avatar Upload */}
      <div className="flex justify-center mb-6">
        <UserProfileAvatarEdit
          currentAvatar={user.avatar}
          onAvatarUpdated={(newAvatarUrl) =>
            dispatch(updatedAvatar(newAvatarUrl))
          }
        />
      </div>

      {/* User Info Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={userData.name}
            onChange={handleOnChange}
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={userData.email}
            onChange={handleOnChange}
          />
        </div>

        {/* Mobile */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-600"
          >
            Mobile
          </label>
          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder="03XX-XXX-XXXX"
            className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={userData.mobile}
            onChange={handleOnChange}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
