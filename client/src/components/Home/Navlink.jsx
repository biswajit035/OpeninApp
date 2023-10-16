/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Navlink = ({title, link}) => {
  return (
    <NavLink exact="true" className="navbar__link" to={link}>
      {title}
    </NavLink>
  );
};

export default Navlink;
