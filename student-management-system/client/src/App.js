import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import StudentList from './components/students/StudentList';
import AddStudent from './components/students/AddStudent';
import EditStudent from './components/students/EditStudent';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<AddStudent />} />
            <Route path="/students/edit/:id" element={<EditStudent />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
