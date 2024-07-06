import React, { useState } from "react";
import Jourlogo from "../../components/common/Logo/Logo.jsx";
import InputField from "../../components/common/InputField/InputField.jsx";
import "./Signup.css";
import SubmitButton from "../../components/SubmitButton/SubmitButton.jsx";
import authServices from "../../services/auth/auth.js";
import ToastMessage from "../../utils/toastMessage.js";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password_confirmation: "",
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

  const validateFormValues = () => {
    const validationErrors = {};
    if (!formData.first_name) {
      validationErrors.first_name = "First name is required";
    }
    if (!formData.last_name) {
      validationErrors.last_name = "Last name is required";
    }
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    if (!formData.password_confirmation) {
      validationErrors.password_confirmation = "Confirm Password is required";
    }
    if (formData.password && formData.password.length < 6) {
      validationErrors.password = "Password is too short";
    }
    if (
      formData.password_confirmation &&
      formData.password &&
      formData.password !== formData.password_confirmation
    ) {
      validationErrors.password_confirmation =
        "Password and confirm password must match.";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validateFormValues()) {
      return;
    }

    try {
      const res = await authServices.registerUser(formData);
      console.log(res)
      if (res.success) {
        ToastMessage.success(res.message);
        redirect("/login");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response);
        ToastMessage.error("Error while signing up");
      }
    }
  };
  return (
    <div>
      <div className="sign-up-wrapper">
        <div className="sign-up-container">
          <header className="jour-logo">
            <Jourlogo />
          </header>
          <main>
            <form action="">
              <InputField
                type="text"
                placeholder="First name"
                name="first_name"
                change={handleChange}
                error={errors.first_name}
              />
              <InputField
                type="text"
                placeholder="Last name"
                name="last_name"
                change={handleChange}
                error={errors.last_name}
              />
              <InputField
                type="text"
                placeholder="Username"
                name="username"
                change={handleChange}
                error={errors.username}
              />
              <InputField
                type="email"
                placeholder="Email"
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
              <InputField
                type="password"
                placeholder="Confirm Password"
                name="password_confirmation"
                change={handleChange}
                error={errors.password_confirmation}
              />
              <SubmitButton
                type="button"
                value="Sign Up"
                onClick={handleSubmit}
              />
            </form>
          </main>
          <footer>
            <a href="./" className="forgot-password">
              Forgot password?
            </a>
            <a href="/login" className="login-login">
              Login
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}
