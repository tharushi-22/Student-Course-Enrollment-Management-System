const Student = require('../models/Student');

// Get all students with search and filter
const getStudents = async (req, res) => {
  try {
    const { search, course, status, page = 1, limit = 10 } = req.query;
    
    // Build query
    let query = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by course
    if (course && course !== 'All') {
      query.course = course;
    }
    
    // Filter by status
    if (status && status !== 'All') {
      query.status = status;
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count for pagination
    const total = await Student.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: students.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: students
    });
  } catch (error) {
    console.error('Error in getStudents:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error in getStudent:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Create new student
const createStudent = async (req, res) => {
  try {
    const { name, email, phone, course, status } = req.body;
    
    // Check if student with email already exists
    const existingStudent = await Student.findOne({ email });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }
    
    // Create student
    const student = await Student.create({
      name,
      email,
      phone,
      course,
      status: status || 'Pending'
    });
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Error in createStudent:', error);
    
    // Validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, course, status } = req.body;
    
    // Check if student exists
    let student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if email is being changed and if it's already taken
    if (email && email !== student.email) {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another student'
        });
      }
    }
    
    // Update student
    student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, course, status },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Error in updateStudent:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    await Student.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Error in deleteStudent:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get statistics
const getStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const enrolledCount = await Student.countDocuments({ status: 'Enrolled' });
    const pendingCount = await Student.countDocuments({ status: 'Pending' });
    const completedCount = await Student.countDocuments({ status: 'Completed' });
    const droppedCount = await Student.countDocuments({ status: 'Dropped' });
    
    // Course-wise distribution
    const courseDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        total: totalStudents,
        enrolled: enrolledCount,
        pending: pendingCount,
        completed: completedCount,
        dropped: droppedCount,
        courseDistribution
      }
    });
  } catch (error) {
    console.error('Error in getStats:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats
};