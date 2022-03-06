import axios from "axios";

const getResume = () => {
  return axios.get("/seleksi-jpt/api/profile").then((r) => r?.data);
};

const createResume = (data) => {
  return axios.post("/seleksi-jpt/api/profile", data);
};

const submitResume = () => {
  return axios.post("/seleksi-jpt/api/submit");
};

const updateResume = (data) => {
  return axios.patch("/seleksi-jpt/api/profile", data);
};

const updateFile = (data) => {
  return axios.patch("/seleksi-jpt/api/file", data, {
    headers: {
      "Content-Type": "multipart/formData",
    },
  });
};

export default {
  getResume,
  createResume,
  submitResume,
  updateResume,
  updateFile,
};
