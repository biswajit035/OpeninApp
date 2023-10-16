/* eslint-disable no-unused-vars */
import {
  Dashboard,
  Home,
  Landing,
  Setting,
  Users,
  Schedule,
  Transaction,
  ContactUs,
  Help,
  Oauth,
  Login,
  Signup
} from "./components/compExp";
import Authentication from "./Authentication";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route path="/oauth" element={<Oauth />} />
        <Route path="/home" element={<Home />}>
          <Route
            index
            element={
              <Authentication>
                <Dashboard />
              </Authentication>
            }
          />
          <Route
            path="/home/transaction"
            element={
              <Authentication>
                <Transaction />
              </Authentication>
            }
          />
          <Route
            path="/home/schedules"
            element={
              <Authentication>
                <Schedule />
              </Authentication>
            }
          />
          <Route
            path="/home/users"
            element={
              <Authentication>
                <Users />
              </Authentication>
            }
          />
          <Route
            path="/home/setting"
            element={
              <Authentication>
                <Setting />
              </Authentication>
            }
          />
          <Route
            path="/home/contact"
            element={
              <Authentication>
                <ContactUs />
              </Authentication>
            }
          />
          <Route
            path="/home/help"
            element={
              <Authentication>
                <Help />
              </Authentication>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
