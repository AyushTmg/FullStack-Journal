import React, { useState } from "react";
import "./login.css";
import InputField from "../../components/common/InputField/InputField";
import JourLogo from "../../components/common/Logo/Logo";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import authServices from "../../services/auth/auth";
import ToastMessage from "../../utils/toastMessage";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export default function Login() {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      return true;
    }

    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }
    try {
      const res = await authServices.loginUser(formData);
      if (res.success) {
        ToastMessage.success(res.message);
        redirect("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
        ToastMessage.error("Invalid email or password");
      }
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <header>
          <div className="Jourlogo">
            <JourLogo />
          </div>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              placeholder="Email "
              name="email"
              change={handleChange}
              error={errors.email}
            />

            <InputField
              type="password"
              placeholder="Password"
              name="password"
              change={handleChange}
              error={errors.password}
            />
            <SubmitButton type="submit" value="Login" onClick={handleSubmit} />
          </form>
        </main>

        <footer>
          <a href="./" className="login-create">
            Create a new account?
          </a>
          <a href="/signup" className="login-sign-up">
            Sign-up
          </a>
        </footer>
      </div>
    </div>
  );
}
