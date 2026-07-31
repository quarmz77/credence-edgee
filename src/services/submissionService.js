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

export const updateSubmission = async (submissionId, data) => {
  const response = await API.patch(`/submissions/${submissionId}`, data);
  return response.data.data;
};

export const updateSubmissionStatus = async (submissionId, data) => {
  const response = await API.patch(`/submissions/${submissionId}/status`, data);
  return response.data.data;
};
