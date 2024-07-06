import React, { useEffect, useState } from "react";
import "./ViewJournal.css";
import journalServices from "../../services/journal/journal";
import { JournalModal } from "../../modals/JournalModal/JournalModal";
import ToastMessage from "../../utils/toastMessage";
import { isAxiosError } from "axios";
import { useLocation } from "react-router-dom";

export const ViewJournal = () => {
  const [content, setContent] = useState([]);
  const location = useLocation();
  const getAllJournals = async () => {
    try {
      const res = await journalServices.fetchAllJournals();
      if (res.success) {
        setContent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJournal = async (id) => {
    try {
      const res = await journalServices.deleteJournal(id);
      if (res.success) {
        ToastMessage.success("Successfully deleted");
        window.location.reload(false);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        ToastMessage.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJournals();
  }, []);
  return (
    <div className="view-journal-table-container">
      <header>
        <h3>View Journal</h3>
      </header>
      <main>
        <ViewJournalTable content={content} deleteJournal={deleteJournal} />
      </main>
    </div>
  );
};

export const ViewJournalTable = ({ content, deleteJournal }) => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleViewModal = () => {
    setOpenViewModal(!openViewModal);
  };

  const toggleEditModal = () => {
    setOpenEditModal(!openEditModal);
  };
  return (
    <div className="view-journal-table">
      <table>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
        {content.map((con, key) => {
          return (
            <tr key={key} className="single-content-container">
              <td>{con.title}</td>
              <td>{con.date}</td>
              <td className="actions">
                <button className="view" onClick={toggleViewModal}>
                  View
                </button>
                <button className="edit" onClick={toggleEditModal}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    deleteJournal(con.id);
                  }}
                >
                  Delete
                </button>
              </td>
              {openEditModal && (
                <JournalModal
                  content={con}
                  mode="edit"
                  closeModal={toggleEditModal}
                />
              )}
              {openViewModal && (
                <JournalModal
                  content={con}
                  mode="view"
                  closeModal={toggleViewModal}
                />
              )}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
