import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGraduationCap, FaList, FaPlus } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <FaGraduationCap className="nav-logo-icon" />
          <span>Student MS</span>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/students" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaList className="nav-icon" />
              Students
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/students/add" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaPlus className="nav-icon" />
              Add Student
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;