import axios from "axios";
import qs from "query-string";

const listParticipants = (query = { limit: 10, offest: 0 }) => {
  const url = qs.stringify(query);
  return axios
    .get(`/seleksi-jpt-admin/api/participants?${url}`)
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
  return axios.get(`/seleksi-jpt-admin/api/report`, { responseType: "blob" });
};

export default {
  getParticipant,
  getDashboard,
  listParticipants,
  correction,
  report,
};
