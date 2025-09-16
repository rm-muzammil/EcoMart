import toast from "react-hot-toast";

import React from "react";

const AxiosToastError = (error) => {
  toast.error(error?.response?.data.message);
};

export default AxiosToastError;
