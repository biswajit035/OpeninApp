/* eslint-disable no-unused-vars */

import Social from "./Social";
import { useEffect, useState } from "react";
import {  Outlet } from "react-router-dom";

const Landing = () => {

  return (
    <div className="landing">
      <div className="landing__left">
        <div className="logo">LOGO</div>
        <div className="board">Board.</div>
        <div className="social">
          <Social link="https://github.com" />
          <Social link="https://twitter.com" />
          <Social link="https://linkedin.com" />
          <Social link="https://discord.com" />
        </div>
      </div>
      <div className="landing__right">
        <div className="landing__right__content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Landing;
