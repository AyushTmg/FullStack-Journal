import React from "react";
import "./JournalModal.css";
import closeIcon from "../../assets/close.svg";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import journalServices from "../../services/journal/journal";
import ToastMessage from "../../utils/toastMessage";
import { useState } from "react";
import { isAxiosError } from "axios";

export const JournalModal = ({ mode, content, closeModal }) => {
  const handleEdit = async () => {
    try {
      const res = await journalServices.editJournal(content.id, formData);
      if (res.success) {
        ToastMessage.success(res.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        ToastMessage.error(error.response.data.message);
      }
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [formData, setFormData] = useState({
    title: content.title,
    content: content.content,
    upload_images: content.upload_images,
  });
  return (
    <div className="journal-modal">
      <div className="journal-modal-container">
        <header>
          <div className="close-button">
            <img src={closeIcon} alt="close" onClick={closeModal} />
          </div>
          <input
            type="text"
            value={content.title}
            name="title"
            readOnly={mode === "edit" ? false : true}
            onChange={handleChange}
          />
          <div className="date">
            <p>{content.date}</p>
          </div>
        </header>
        <main>
          <textarea
            readOnly={mode === "edit" ? false : true}
            name="content"
            onChange={handleChange}
          >
            {content.content}
          </textarea>
          {mode === "edit" && (
            <SubmitButton value="Save" onClick={handleEdit} />
          )}
        </main>
      </div>
    </div>
  );
};
