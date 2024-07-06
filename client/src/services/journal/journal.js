import { api } from "../../api/api";

const fetchAllJournals = async () => {
  const res = await api.get("/api/journal/");
  return res.data;
};

const createJournal = async (payload) => {
  const res = await api.post("/api/journal/", payload);
  return res.data;
};

const editJournal = async (id, payload) => {
  const res = await api.patch(`/api/journal/${id}/`, payload);
  return res.data;
};
const deleteJournal = async (id) => {
  const res = await api.delete(`/api/journal/${id}/`);
  return res.data;
};

export default {
  fetchAllJournals,
  createJournal,
  editJournal,
  deleteJournal,
};
