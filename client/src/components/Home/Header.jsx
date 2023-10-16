/* eslint-disable react/prop-types */

import { useLocation, useNavigate } from "react-router-dom";
import NavToogl from "../Reusable/NavToogl";
import secureLocalStorage from "react-secure-storage";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameParts = location.pathname.split("/");
  const title = pathnameParts[pathnameParts.length - 1];
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const profilePicUrl =  secureLocalStorage.getItem("profile");

  const divStyle = {
    backgroundImage: `url(${profilePicUrl})`,
    backgroundSize: "cover", // Adjust this as needed
    width: "40px", // Set the width and height as needed
    height: "40px",
  };

  return (
    <div className="header">
      <NavToogl />
      <div className="title">
        {title ? capitalizeFirstLetter(title) : "Dashboard"}
      </div>
      <div className="search">
        <div className="search-bar-body">
          <input type="text" placeholder="Search..." />
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
            alt="search--v1"
          />
        </div>
      </div>
      <div className="notification">
        <a href="">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/100/appointment-reminders--v1.png"
            alt="appointment-reminders--v1"
          />
        </a>
      </div>
      <div className="profile-pic" style={divStyle}></div>
      <div
        className="logout"
        onClick={() => {
          secureLocalStorage.removeItem("token"),
            secureLocalStorage.removeItem("profile"),
            navigate("/");
        }}
      >
        <img
          width="100%"
          height="100%"
          src="https://img.icons8.com/plumpy/exit.png"
          alt="exit--v1"
        />
      </div>
    </div>
  );
};

export default Header;
