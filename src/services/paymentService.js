import API from "../api/axios";

export const initializePayment = async (data) => {
  const res = await API.post("/payments/paystack/initialize", data);
  return res.data;
};

export const verifyPayment = async (reference) => {
  const res = await API.get(`/payments/paystack/verify/${reference}`);
  return res.data;
};

export const createPayment = async (data) => {
  const res = await API.post("/payments", data);
  return res.data;
};
