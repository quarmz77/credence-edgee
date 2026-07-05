import API from "../api/axios";

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data.data;
};

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data;
};

export const requestPasswordReset = async (data) => {
  const res = await API.post("/auth/forgot-password", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await API.post("/auth/reset-password", data);
  return res.data;
};

export const verifyEmail = async (token) => {
  const res = await API.get(
    `/auth/verify-email?token=${encodeURIComponent(token)}`,
  );
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/auth/profile", data);
  return res.data.data;
};
