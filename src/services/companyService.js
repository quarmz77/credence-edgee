import API from "../api/axios";

export const registerCompany = async (data) => {
  return API.post("/company", data);
};

export const getCompany = async () => {
  return API.get("/company/profile");
};

export const updateCompany = async (data) => {
  return API.patch("/company/profile", data);
};
