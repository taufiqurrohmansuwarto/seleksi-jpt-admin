import axios from "axios";

const listParticipants = (query) => {
  return axios
    .get(`/seleksi-jpt-admin/api/participants`)
    .then((res) => res?.data);
};

const getParticipant = (participantId) => {
  return axios
    .get(`/seleksi-jpt-admin/api/participants/${participantId}`)
    .then((res) => res?.data);
};

const getDashboard = () => {
  return axios.get(`/seleksi-jpt-admin/api/dashboard`).then((res) => res?.data);
};

const correction = ({ participantId, data }) => {
  return axios
    .post(
      `/seleksi-jpt-admin/api/participants/${participantId}/correction`,
      data
    )
    .then((res) => res?.data);
};

const report = () => {
  return axios.get(`/seleksi-jpt/admin/api/report`);
};

export default {
  getParticipant,
  getDashboard,
  listParticipants,
  correction,
  report,
};
