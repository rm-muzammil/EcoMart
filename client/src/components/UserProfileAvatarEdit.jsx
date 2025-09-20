import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { updatedAvatar } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function UserProfileAvatarEdit({
  currentAvatar,
  onAvatarUpdated,
}) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(currentAvatar || "");
  const [loading, setLoading] = useState(false);

  // ✅ Sync preview with Redux when currentAvatar updates
  useEffect(() => {
    setPreview(currentAvatar || "");
  }, [currentAvatar]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview instantly
    setPreview(URL.createObjectURL(file));

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("You must be logged in to upload an avatar.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:8080/api/user/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        const newAvatar = res.data.data.avatar;
        dispatch(updatedAvatar(newAvatar));
        onAvatarUpdated(newAvatar);
        toast.success(res.data.message || "Avatar updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to upload avatar");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-24 h-24">
        <img
          src={preview || "/default-avatar.png"}
          alt="User Avatar"
          className={`w-24 h-24 rounded-full object-cover border-4 border-gray-200 ${
            loading ? "opacity-50" : ""
          }`}
        />
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <span className="text-white text-sm animate-pulse">
              Uploading...
            </span>
          </div>
        )}
        {/* Upload Button */}
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-green-700"
        >
          📷
        </label>
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>
    </div>
  );
}
