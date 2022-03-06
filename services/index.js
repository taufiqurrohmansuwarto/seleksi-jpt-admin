import axios from "axios";

const listParticipants = (query) => {
  return axios
    .get(`/seleksi-jpt-admin/api/participants`)
    .then((res) => res?.data);
};

const getParticipants = (participantId) => {
  return axios
    .get(`/seleksi-jpt-admin/api/participants/${participantId}/detail`)
    .then((res) => res?.data);
};

const getDashboard = () => {
  return axios.get(`/seleksi-jpt-admin/api/dashboard`).then((res) => res?.data);
};

export default {
  getParticipants,
  getDashboard,
  listParticipants,
};
