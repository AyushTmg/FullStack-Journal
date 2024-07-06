import React from "react";
import "./CreateJournal.css";
import InputField from "../../components/common/InputField/InputField";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState, useRef } from "react";
import imageIcon from "../../assets/image.svg";
import closeIcon from "../../assets/close.svg";
import journalServices from "../../services/journal/journal";
import ToastMessage from "../../utils/toastMessage";
import { isAxiosError } from "axios";

export const CreateJournal = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    created_date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState([]);
  const [placeImage, setPlaceImage] = useState([]);
  const profileRef = useRef();
  const openFileSelectionPanel = () => {
    //opening the file selection panel
    profileRef.current.click();
  };
  const handleFileSelection = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile([...selectedFile, file]);
      setPlaceImage(reader.result);
      setPlaceImage([...placeImage, reader.result]);
    };
    reader.onerror = (e) => {
      console.log(e);
    };
  };

  const removeFile = (image) => {
    const filesAfterElimination = placeImage.filter((im) => im !== image);
    setPlaceImage(filesAfterElimination);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateFormValues = () => {
    const validationErrors = {};
    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.content) {
      validationErrors.content = "Content is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormValues()) {
      return;
    }

    try {
      console.log({ ...formData, ["uploaded_images"]: selectedFile });
      const res = await journalServices.createJournal({
        ...formData,
        ["upload_images"]: selectedFile,
      });
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
  return (
    <div className="create-journal-wrapper">
      <div className="create-journal-container">
        <header>
          <h3>Create Your Journal.</h3>
        </header>
        <main>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <InputField
              placeholder="Enter your title"
              type="text"
              name="title"
              change={handleChange}
              error={errors.title}
            />
            <div className="content">
              <textarea
                placeholder="Enter your journal content "
                type="text"
                name="content"
                onChange={handleChange}
              ></textarea>
              <abbr title="Add photo">
                <img
                  src={imageIcon}
                  alt="photo"
                  onClick={openFileSelectionPanel}
                />
              </abbr>
              {errors.content && <p className="error">{errors.content}</p>}
            </div>
            <input
              type="file"
              ref={profileRef}
              name="file"
              onChange={handleFileSelection}
              accept="image/*"
            />
            {placeImage.length > 0 && (
              <ShowSelectedImages
                imagesList={placeImage}
                closePhoto={removeFile}
              />
            )}
            <SubmitButton value="Create" type="submit" />
          </form>
        </main>
      </div>
    </div>
  );
};

const ShowSelectedImages = ({ imagesList, closePhoto }) => {
  return (
    <div className="show-selected-images-section">
      <header>
        <h5>Selected Images</h5>
      </header>
      {imagesList.map((image, index) => {
        return (
          <div className="image-section">
            <img
              src={closeIcon}
              alt="close"
              id="close"
              onClick={() => closePhoto(image)}
            />
            <img key={index} src={image} />
          </div>
        );
      })}
    </div>
  );
};
