import API from "../api/axios";

export const getProjects = async (params = {}) => {
  return await API.get("/projects", { params });
};

export const getProject = async (id) => {
  return await API.get(`/projects/${id}`);
};

export const createProject = async (data) => {
  return API.post("/projects", data);
};

export const updateProject = async (id, data) => {
  return API.patch(`/projects/${id}`, data);
};

export const deleteProject = async (id) => {
  return API.delete(`/projects/${id}`);
};
