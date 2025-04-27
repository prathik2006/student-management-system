// src/components/AddStudent.js
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { addStudent } from '../../api/api';
import './StudentForm.css';

const AddStudent = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object({
    studentId: Yup.string().required('Required').matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters allowed'),
    firstName: Yup.string().required('Required').min(2, 'At least 2 characters'),
    lastName: Yup.string().required('Required').min(2, 'At least 2 characters'),
    email: Yup.string().email('Invalid email').required('Required'),
    dob: Yup.date().required('Required').max(new Date(), 'Future date not allowed'),
    department: Yup.string().required('Required'),
    enrollmentYear: Yup.number().required('Required').min(2000).max(currentYear),
    isActive: Yup.boolean()
  });

  const initialValues = {
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: currentYear,
    isActive: true,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addStudent(values);
      resetForm();
      navigate('/students');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="student-form-container fade-in">
    <div className="card">
      <h1 className="form-title">Add New Student</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <Field
                  type="text"
                  id="studentId"
                  name="studentId"
                  className={`form-control ${errors.studentId && touched.studentId ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="studentId" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="firstName" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lastName" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  className={`form-control ${errors.dob && touched.dob ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="dob" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <Field
                  as="select"
                  id="department"
                  name="department"
                  className={`form-control ${errors.department && touched.department ? 'is-invalid' : ''}`}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Economics">Economics</option>
                </Field>
                <ErrorMessage name="department" component="div" className="form-error" />
              </div>
              
              <div className="form-group">
                <label htmlFor="enrollmentYear">Enrollment Year</label>
                <Field
                  type="number"
                  id="enrollmentYear"
                  name="enrollmentYear"
                  min="2000"
                  max={currentYear}
                  className={`form-control ${errors.enrollmentYear && touched.enrollmentYear ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="enrollmentYear" component="div" className="form-error" />
              </div>
              
              <div className="form-group checkbox-group">
                <label className="checkbox-container">
                  <Field type="checkbox" name="isActive" />
                  <span className="checkbox-label">Active Student</span>
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/students')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  );
};

export default AddStudent;
