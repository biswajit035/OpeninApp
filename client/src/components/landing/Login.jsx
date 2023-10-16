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

const Login = () => {
  const navigate = useNavigate();

  // all state here
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // all the handeling functions are here
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (form.email && form.password) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_HOST}/api/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );
      const data = await response.json();

      // login succesfuly
      if (response.status == 200) {
        secureLocalStorage.setItem("token", data.token);
        secureLocalStorage.setItem("profile", data.profile);
        toast.success(data.message);
        navigate("/home/");
      } else if (response.status == 404) {
        toast.warn(data.message);
      } else if (response.status == 500) {
        toast.warn("Internal server error");
      }
    } else {
      toast.error("Fill all the field first");
    }
    setLoading(false);
  };

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
      <div className="title">Sign In </div>
      <div className="subtitle">Sign in to your account</div>
      <div className="signin-with">
        <Link to={`${import.meta.env.VITE_BACKEND_HOST}/api/google`}>
          <GoogleLoginButton iconSize="20px" style={SocialButtonStyle}>
            <span>Sign in with Google</span>
          </GoogleLoginButton>
        </Link>
        <AppleLoginButton iconSize="20px" style={SocialButtonStyle}>
          <span>Sign in with Apple</span>
        </AppleLoginButton>
      </div>

      {/* Login form  */}
      <form>
        <label htmlFor="email">Email address</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        ></input>
        <span className="color-blue">Forgot Password?</span>
        {loading ? 
          <Lottie options={defaultOptions} height={100} width={100} />
         : 
          <button onClick={handeSubmit}>Sign In</button>
        }
      </form>
      <span>
        Dont have an account?{" "}
        <Link to="register" className="color-blue">
          Register here
        </Link>
      </span>
    </>
  );
};

export default Login;
