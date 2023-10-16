/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import "./navtoggl.css";
import { changeNav } from "../../store/navSlice";


const NavToogl = (props) => {
  const { navbar } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const handleTest=()=>{
    dispatch(changeNav(navbar))
  }

  return (
    <div className="navtoggl">
      <label htmlFor="check">
        <input type="checkbox" id="check" onClick={handleTest} />
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  );
};

export default NavToogl