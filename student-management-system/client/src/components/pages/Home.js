import React from 'react';
import { FaListAlt, FaUserGraduate, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home fade-in">
      <div className="hero" >
        <h1 className="hero-title">Student Management System</h1>
        <p className="hero-text">
          A comprehensive solution for managing student records efficiently
        </p>
        <Link to="/students" className="btn btn-primary hero-btn">
          Get Started
        </Link>
      </div>
      
      <div className="features">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="feature-grid">
            <div className="feature-card card">
              <div className="feature-icon">
                <FaUserGraduate />
              </div>
              <h3>Student Records</h3>
              <p>
                Store and manage comprehensive student information including 
                personal details, academic records, and enrollment status.
              </p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">
                <FaListAlt />
              </div>
              <h3>Efficient Management</h3>
              <p>
                Easily add, edit, view, and delete student records with 
                a user-friendly interface and powerful search capabilities.
              </p>
            </div>
            
            <div className="feature-card card">
              <div className="feature-icon">
                <FaUserPlus />
              </div>
              <h3>Quick Registration</h3>
              <p>
                Register new students quickly with validation to ensure 
                data integrity and completeness of records.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Begin managing your student records today</p>
          <div className="cta-buttons">
            <Link to="/students" className="btn btn-secondary">View Students</Link>
            <Link to="/students/add" className="btn btn-primary">Add New Student</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
