import { message } from "antd";
import Axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers.Authorization) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// run after each response
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    // if unauthenticated error, reset persisted data and log out the user
    if (status === 401) {
      message.error(error?.message);
      setTimeout(() => {
        localStorage.removeItem("token");
      }, 3000);
      return error;
    }
    return Promise.reject(error);
  }
);

export const API = {
  //Documents getALl
  getAllDocuments: (selectedStatus: string) =>
    axiosInstance
      .get(`/documents?status=${selectedStatus}`)
      .then((res) => res.data.data),
      //Create Document
  createDocument: (data: any) =>
    axiosInstance.post(`/documents`, data).then((res) => res.data),
    //GetDocumentById
  getDocumentById: (id: any) =>
    axiosInstance.get(`/document/${id}`).then((res) => res.data.data),
};
