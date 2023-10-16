/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navlink from "./Navlink";
import Header from "./Header";


const Home = () => {
    const { navbar } = useSelector((state) => state.nav);

  return (
    <div className="home">

      <div className={`home__left ${navbar ? "" : "hidenav"}`}>
        <nav>
          <div className="title">Board.</div>
          <div className="links">
            <Navlink title="Dashboard" link=" " />
            <Navlink title="Transaction" link="transaction" />
            <Navlink title="Schedules" link="schedules" />
            <Navlink title="Users" link="users" />
            <Navlink title="Settings" link="setting" />
          </div>
          <div className="contacts">
            <Navlink title="Help" link="help" />
            <Navlink title="Contact-Us" link="contact" />
          </div>
        </nav>
      </div>
      <div className="home__right">
        <Header title="Dashboard" />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
