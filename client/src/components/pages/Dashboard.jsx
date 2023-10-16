/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { BarChart, PieChart, Count } from "../compExp";
import Modal from "./Modal";
import secureLocalStorage from "react-secure-storage";

const Dashboard = () => {
  const colorPallete = ["red", "blue", "yellow", "green", "purple", "orange"];

  // HANDLED STATE HERE
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState({
    analytics: true,
    info: true,
    pieInfo: true,
    profile: true,
  });
  const [analytics, setAnalytics] = useState();
  const [info, setInfo] = useState({
    labels: [],
    datasets: [],
  });
  const [pieInfo, setPieInfo] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [],
    test: [],
  });
  const [profile, setProfile] = useState(null);


  // HANDLED FETCHING FUNCTION HERE
  const handleModal = () => {
    setModalShow((prev) => !prev);
  };
  async function fecthAnalytics() {
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/data/analytics`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            setAnalytics(data);
            setLoading((prevLoading) => ({
              ...prevLoading,
              analytics: false,
            }));
          })
          .catch((err) => console.log("Promise error: " + err));
      })
      .catch((err) => console.log("fetching error: " + err));
  }
  async function fecthActivities() {
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/data/activities`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            // Etting table label
            data[0].data.map((item, idx) => {
              info.labels.push(`week${idx + 1}`);
            });
            // setting up data
            data.map((item, idx) => {
              const newData = {
                label: item.label,
                data: item.data,
                backgroundColor: colorPallete[idx % colorPallete.length],
              };
              info.datasets.push(newData);
              // set loading false
              setLoading((prevLoading) => ({
                ...prevLoading,
                info: false,
              }));
            });
          })
          .catch((err) => console.log("Promise error: " + err));
      })
      .catch((err) => console.log("fetching error: " + err));
  }
  async function fecthProducts() {
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/data/products`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            // set the data
            data.map((item, idx) => {
              item.data.map((itm, idx) => {
                pieInfo.test.push(colorPallete[idx % colorPallete.length]);
              });
              const newData = {
                label: item.label,
                data: item.data,
                backgroundColor: pieInfo.test,
              };
              pieInfo.datasets.push(newData);
              // pieInfo.datasets[idx].push({"back":"red"})
            });
            setLoading((prevLoading) => ({ ...prevLoading, pieInfo: false }));
          })
          .catch((err) => console.log("Promise error: " + err));
      })
      .catch((err) => console.log("fetching error: " + err));
  }
  async function fetchProfile() {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_HOST}/api/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: secureLocalStorage.getItem("token"),
        }),
      }
    );
    if(response.status == 200)
    {
      const data = await response.json();
        setProfile(data);
    }

    setLoading((prevLoading) => ({ ...prevLoading, profile: false }));
  }

  useEffect(() => {
    fetchProfile();

    fecthAnalytics()
      .then(() => {
        return fecthActivities();
      })
      .then(() => {
        return fecthProducts();
      });
  }, []);

  return (
    <>
      <div className="dashboard">
        {modalShow && <Modal handleModal={handleModal} />}
        
        {/* count card */}
        <div className="count-card">
          {/* TOP CARDS */}
          {loading.analytics
            ? "Loading...."
            : analytics.map((item, idx) => {
                return (
                  <Count
                    key={idx}
                    title={item.title}
                    value={item.value}
                    inc={item.inc}
                    link={item.link}
                  />
                );
              })}
        </div>

        {/* bar chart */}
        {loading.info ? (
          "loading"
        ) : info.datasets.length == 0 ? (
          "null"
        ) : (
          <BarChart data={info} />
        )}

        {/* pie chart */}
        <div className="pie-chart">
          <div className="pie-item">
            {loading.pieInfo ? (
              "Loading"
            ) : pieInfo.datasets.length == 0 ? (
              "null"
            ) : (
              <PieChart pieInfo={pieInfo} />
            )}
          </div>
          <div className="profile">
            {loading.profile ? (
              "Loading.."
            ) : profile == null ? (
              <div className="add_profile">
                <img
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/100/add--v1.png"
                  alt="add--v1"
                  onClick={handleModal}
                />
                <span>Add Profile</span>
              </div>
            ) : (
              <>
                <div className="name">{profile.name}</div>
                <div className="social">
                  <div className="left">
                    <span>{profile.mobile}</span>
                    <span>{profile.email}</span>
                  </div>
                  <div className="right">
                    <span>{profile.instagram}</span>
                    <span>{profile.youtube}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
