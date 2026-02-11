const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats
} = require('../controllers/studentController');

// Stats route (must be before /:id)
router.get('/stats', getStats);

// Main routes
router.route('/')
  .get(getStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;