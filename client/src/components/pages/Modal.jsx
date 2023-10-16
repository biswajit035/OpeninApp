/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Modal = ({ handleModal }) => {
  const [activeState, setActiveState] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    mobile: "",
    instagram: "",
    youtube: "",
  });

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
    const response = await fetch("http://localhost:8000/api/profile", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        name: form.name,
        mobile: form.mobile,
        instagram: form.instagram,
        youtube: form.youtube,
        token: secureLocalStorage.getItem("token"),
      }),
    });
    const data = await response.json();
    window.location.reload();
  };

  
  

  return (
    <div className="modal">
      <div className="modal_content">
        <div className="modal_header">
          <span>Add New Profile</span>
          <span className="close" onClick={() => handleModal()}>
            x
          </span>
        </div>
        <div className="modal_nav">
          <div
            className={`modal_nav_item ${
              activeState ? "" : "modal_nav_item-active"
            }`}
            onClick={() => {
              setActiveState(false);
            }}
          >
            Basic
          </div>
          <div
            className={`modal_nav_item ${
              !activeState ? "" : "modal_nav_item-active"
            }`}
            onClick={() => {
              setActiveState(true);
            }}
          >
            contact
          </div>
        </div>
        <div className="modal_form">
          {!activeState && (
            <div className="one">
              <label htmlFor="name">
                Enter Name
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Eg. John Doe"
                  onChange={handleChange}
                  value={form.name}
                />
              </label>

              <label htmlFor="email">
                Enter Email
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Eg. john@xyz.com"
                  onChange={handleChange}
                  value={form.email}
                />
              </label>

              <label htmlFor="mobile">
                Enter Phone Number
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  placeholder="Eg. +91 234256985"
                  onChange={handleChange}
                  value={form.mobile}
                />
              </label>
            </div>
          )}
          {activeState && (
            <div className="two">
              <label htmlFor="instagram">
                Instagram Link
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  placeholder="Eg. instagram.com/username"
                  onChange={handleChange}
                  value={form.instagram}
                />
              </label>

              <label htmlFor="youtube">
                YoutubeLink
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  placeholder="Eg. instagram.com/username"
                  onChange={handleChange}
                  value={form.youtube}
                />
              </label>
            </div>
          )}
        </div>
        <div className="modal_control">
          {activeState && (
            <button
              onClick={() => {
                setActiveState(false);
              }}
            >
              Back
            </button>
          )}
          {!activeState && (
            <button
              onClick={() => {
                setActiveState(true);
              }}
            >
              Next
            </button>
          )}
          {activeState && <button onClick={handeSubmit}>Done</button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
