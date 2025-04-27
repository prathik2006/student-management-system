// src/components/EditStudent.js
import { format } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getStudentById, updateStudent } from '../../api/api';
import './StudentForm.css';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent({ ...data, dob: format(new Date(data.dob), 'yyyy-MM-dd') });
      } catch (err) {
        navigate('/students');
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const validationSchema = Yup.object({
    studentId: Yup.string().required('Required').matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters allowed'),
    firstName: Yup.string().required('Required').min(2, 'At least 2 characters'),
    lastName: Yup.string().required('Required').min(2, 'At least 2 characters'),
    email: Yup.string().email('Invalid email').required('Required'),
    dob: Yup.date().required('Required').max(new Date(), 'Date cannot be in the future'),
    department: Yup.string().required('Required'),
    enrollmentYear: Yup.number().required('Required').min(2000).max(currentYear),
    isActive: Yup.boolean()
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateStudent(id, values);
      navigate('/students');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!student) return <div className="loading">Loading...</div>;

  return (
    <div className="student-form-container fade-in">
    <div className="card">
      <h1 className="form-title">Edit Student</h1>
      <Formik
        initialValues={student}
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
                {isSubmitting ? 'Updating...' : 'Update Student'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </div>
  );
};

export default EditStudent;
