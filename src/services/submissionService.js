import API from "../api/axios";

export const getSubmissions = async (params) => {
  const response = await API.get("/submissions", { params });
  return response.data.data;
};

export const getSubmission = async (id) => {
  const response = await API.get(`/submissions/${id}`);
  return response.data.data;
};

export const createSubmission = async (data) => {
  const response = await API.post("/submissions", data);
  return response.data.data;
};
