/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {
  AppleLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { toast } from "react-toastify";
import loader from "../../assets/loading_button.json";
import Lottie from "react-lottie";

const Signup = () => {
  const navigate = useNavigate();

  // all state handle here
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  // all the function hadled here
  function handleFileUpload(event) {
    setFiles(event.target.files[0]);
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    if (form.name && form.email && form.password && files) {
      const formData = new FormData();
      formData.append("file", files);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/api/signup`,
        {
          method: "POST",
          enctype: "multipart/form-data",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status == 409) toast.warn(data.message);

      // successfully registered
      else if (response.status == 200) {
        secureLocalStorage.setItem("token", data.token);
        secureLocalStorage.setItem("profile", data.profile);
        toast.success(data.message);
        navigate("/home/");
      } else {
        toast.warn(data.message);
      }
    } else {
      toast.error("Fill all the field first");
    }
    setLoading(false);
  }

  // lottie icon
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loader,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
     const SocialButtonStyle = {
       padding: "2px 2px",
       height: "fit-content",
       width: "fit-content",
       fontSize: "16px",
       margin: "5px 0px",
     };
  return (
    <>
      <div className="title">Sign up </div>
      <div className="subtitle">Sign up to your account</div>
      <div className="signin-with">
        <Link to="http://localhost:8000/api/google">
          <GoogleLoginButton iconSize="20px" style={SocialButtonStyle}>
            <span>Sign up with Google</span>
          </GoogleLoginButton>
        </Link>

        <AppleLoginButton iconSize="20px" style={SocialButtonStyle}>
          <span>Sign up with Apple</span>
        </AppleLoginButton>
      </div>
      <form >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          required
        />
        <label htmlFor="profile">Choose profile photo</label>
        <input
          type="file"
          name="profile"
          id="profile"
          onChange={handleFileUpload}
        />
        {loading ? (
          <Lottie options={defaultOptions} height={60} width={150} />
        ) : (
          <button onClick={handleUpload}>Sign up</button>
        )}
      </form>
      <span>
        Already have an account?{" "}
        <Link to="/" className="color-blue">
          Sign in here
        </Link>
      </span>
    </>
  );
};

export default Signup;
