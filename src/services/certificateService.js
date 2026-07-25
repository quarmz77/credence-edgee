import API from "../api/axios";

export const getCertificates = async (params = {}) => {
  const response = await API.get("/certificates", { params });
  return response.data.data;
};

export const getCertificateById = async (id) => {
  const response = await API.get(`/certificates/${id}`);
  return response.data.data;
};
