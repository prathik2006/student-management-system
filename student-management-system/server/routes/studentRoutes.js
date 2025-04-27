const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const studentController =  require('../controllers/studentController');

// Validation middleware
const studentValidation = [
  check('studentId', 'Student ID is required and must be alphanumeric').isAlphanumeric(),
  check('firstName', 'First name is required and must be at least 2 characters').isLength({ min: 2 }),
  check('lastName', 'Last name is required and must be at least 2 characters').isLength({ min: 2 }),
  check('email', 'Please include a valid email').isEmail(),
  check('dob', 'Date of birth is required').notEmpty(),
  check('department', 'Department is required').notEmpty(),
  check('enrollmentYear', 'Enrollment year must be between 2000 and current year')
    .isInt({ min: 2000, max: new Date().getFullYear() })
];

// Routes
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentValidation, studentController.createStudent);
router.put('/:id', studentValidation, studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;