// src/api/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
    baseURL: 'https://student-management-system-r6fl.onrender.com/api',
  });
  

// Get all students
export const getStudents = async () => {
  try {
    const res = await API.get('/students');
    return res.data;
  } catch (err) {
    toast.error('Failed to fetch students');
    throw err;
  }
};

// Get a single student
export const getStudentById = async (id) => {
  try {
    const res = await API.get(`/students/${id}`);
    return res.data;
  } catch (err) {
    toast.error('Failed to fetch student data');
    throw err;
  }
};

// Add new student
export const addStudent = async (studentData) => {
  try {
    await API.post('/students', studentData);
    toast.success('Student added successfully');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add student');
    throw err;
  }
};

// Update student
export const updateStudent = async (id, updatedData) => {
  try {
    await API.put(`/students/${id}`, updatedData);
    toast.success('Student updated successfully');
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to update student');
    throw err;
  }
};

// Delete student
export const deleteStudentById = async (id) => {
  try {
    await API.delete(`/students/${id}`);
    toast.success('Student deleted successfully');
  } catch (err) {
    toast.error('Failed to delete student');
    throw err;
  }
};



export default API;
