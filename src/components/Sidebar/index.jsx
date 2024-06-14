// Sidebar.jsx
import React from "react";
import "../Sidebar/index.css";
import { Link } from "react-router-dom";
import {
  BsPersonCircle,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsPersonCircle className="icon_header" />ADMIN
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/agroforestry">
            <BsFillArchiveFill className="icon" /> Agro-Forestry
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/beekeeping">
            <BsFillGrid3X3GapFill className="icon" /> Beekeeping
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/awareness-raising">
            <BsPeopleFill className="icon" /> Awareness Raising
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/improvement-cooking">
            <BsListCheck className="icon" /> Improvement Cooking
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/reports">
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/setting">
            <BsFillGearFill className="icon" /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
