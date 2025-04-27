import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('enrollmentYear');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
        setStudents(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch students');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
        setStudents(students.filter(student => student._id !== id));
        toast.success('Student deleted successfully');
      } catch (err) {
        toast.error('Failed to delete student');
        console.error(err);
      }
    }
  };
  
  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort and filter students
  const filteredStudents = students
    .filter(student => {
      return (
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
  // Render sort icon
  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />;
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="student-list-container fade-in">
      <div className="list-header card">
        <h1 className="list-title">Student Directory</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="list-actions">
          <Link to="/students/add" className="btn btn-primary">
            Add New Student
          </Link>
        </div>
      </div>
      
      {filteredStudents.length === 0 ? (
        <div className="no-students card">
          <p>No students found. {searchTerm && 'Try a different search term or'} add a new student.</p>
          <Link to="/students/add" className="btn btn-primary mt-3">
            Add New Student
          </Link>
        </div>
      ) : (
        <div className="table-container card">
          <table className="student-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('studentId')} className="sortable">
                  ID {renderSortIcon('studentId')}
                </th>
                <th onClick={() => handleSort('firstName')} className="sortable">
                  Name {renderSortIcon('firstName')}
                </th>
                <th onClick={() => handleSort('email')} className="sortable">
                  Email {renderSortIcon('email')}
                </th>
                <th onClick={() => handleSort('department')} className="sortable">
                  Department {renderSortIcon('department')}
                </th>
                <th onClick={() => handleSort('enrollmentYear')} className="sortable">
                  Year {renderSortIcon('enrollmentYear')}
                </th>
                <th onClick={() => handleSort('isActive')} className="sortable">
                  Status {renderSortIcon('isActive')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>
                    {student.firstName} {student.lastName}
                  </td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>
                  <td>{student.enrollmentYear}</td>
                  <td>
                    <span className={`badge ${student.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="actions">
                    <Link to={`/students/edit/${student._id}`} className="action-btn edit-btn">
                      <FaEdit />
                    </Link>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => deleteStudent(student._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;