import { api } from "../../api/api";

const registerUser = async (payload) => {
  const res = await api.post("api/auth/register/", payload);

  return res.data;
};

const loginUser = async (payload) => {
  const res = await api.post("api/auth/login/", payload);

  if (res.data.success) {
    const accessToken = res.data.data.access;
    localStorage.setItem("access_token", accessToken);
  }
  return res.data;
};

export default {
  registerUser,
  loginUser,
};
