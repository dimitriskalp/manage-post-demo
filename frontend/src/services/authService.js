import axiosClient from "../axios-client.js";

export const loginUser = async (email, password) => {
  try {
    const { data } = await axiosClient.post("/login", { email, password });
    return { success: true, data };
  } catch (error) {
    const response = error.response;
    if (response && response.status === 422) {
      return {
        success: false,
        errors: response.data.errors || { email: [response.data.message] },
      };
    }
    return { success: false, errors: { general: ["Something went wrong"] } };
  }
};
