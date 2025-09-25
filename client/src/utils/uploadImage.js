import Axios from "../utils/Axios";
const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await Axios.post("/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export default uploadImage;
