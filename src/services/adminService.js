import API from "../api/axios";

export const getAdminOverview = async () => {
  const response = await API.get("/admin/overview");
  return response.data.data;
};

export const getAdminUsers = async () => {
  const response = await API.get("/admin/users");
  return response.data.data;
};

export const getAdminProjects = async () => {
  const response = await API.get("/admin/projects");
  return response.data.data;
};

export const updateAdminUser = async (userId, updates) => {
  const response = await API.patch(`/admin/users/${userId}`, updates);
  return response.data.data;
};

export const getPendingCompanies = async () => {
  const response = await API.get("/admin/companies/pending");
  return response.data.data;
};

export const updateCompanyStatus = async (companyId, status) => {
  const response = await API.patch(`/admin/companies/${companyId}/status`, {
    status,
  });
  return response.data.data;
};

export const deleteProject = async (projectId) => {
  const response = await API.delete(`/admin/projects/${projectId}`);
  return response.data.data;
};

export const getSubmissions = async (status) => {
  const response = await API.get("/admin/submissions", { params: { status } });
  return response.data.data;
};

export const reviewSubmission = async (
  submissionId,
  { status, reviewerNotes },
) => {
  const response = await API.patch(
    `/admin/submissions/${submissionId}/review`,
    {
      status,
      reviewerNotes,
    },
  );
  return response.data.data;
};

export const getRatings = async (projectId) => {
  const response = await API.get("/admin/ratings", { params: { projectId } });
  return response.data.data;
};

export const deleteRating = async (ratingId) => {
  const response = await API.delete(`/admin/ratings/${ratingId}`);
  return response.data.data;
};

export const getCertificates = async () => {
  const response = await API.get("/admin/certificates");
  return response.data.data;
};

export const getProjects = async (approvalStatus) => {
  const response = await API.get("/admin/projects", {
    params: { approvalStatus },
  });
  return response.data.data;
};

export const updateProjectApproval = async (projectId, approvalStatus) => {
  const response = await API.patch(`/admin/projects/${projectId}/approval`, {
    approvalStatus,
  });
  return response.data.data;
};

export const rateSubmission = async (submissionId, { rating, comment }) => {
  const response = await API.post(`/admin/submissions/${submissionId}/rate`, {
    rating,
    comment,
  });
  return response.data.data;
};