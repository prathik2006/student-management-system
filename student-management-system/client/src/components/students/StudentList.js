// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSearch, FaSortAmountDown, FaSortAmountUp, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteStudentById, getStudents } from '../../api/api';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('enrollmentYear');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudentById(id);
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredStudents = students
    .filter(student => {
      const term = searchTerm.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(term) ||
        student.lastName.toLowerCase().includes(term) ||
        student.studentId.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.department.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />;
  };

  if (loading) return <div className="loading">Loading...</div>;

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
                <th onClick={() => handleSort('studentId')} className="sortable">ID {renderSortIcon('studentId')}</th>
                <th onClick={() => handleSort('firstName')} className="sortable">Name {renderSortIcon('firstName')}</th>
                <th onClick={() => handleSort('email')} className="sortable">Email {renderSortIcon('email')}</th>
                <th onClick={() => handleSort('department')} className="sortable">Department {renderSortIcon('department')}</th>
                <th onClick={() => handleSort('enrollmentYear')} className="sortable">Year {renderSortIcon('enrollmentYear')}</th>
                <th onClick={() => handleSort('isActive')} className="sortable">Status {renderSortIcon('isActive')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{student.firstName} {student.lastName}</td>
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
                    <button className="action-btn delete-btn" onClick={() => handleDelete(student._id)}>
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
