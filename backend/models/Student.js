const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide email address'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    match: [
      /^[0-9]{10}$/,
      'Please provide a valid 10-digit phone number'
    ]
  },
  course: {
    type: String,
    required: [true, 'Please select a course'],
    enum: {
      values: [
        'Computer Science',
        'Information Technology',
        'Software Engineering',
        'Data Science',
        'Cybersecurity',
        'Web Development',
        'Mobile Development',
        'Cloud Computing'
      ],
      message: 'Please select a valid course'
    }
  },
  status: {
    type: String,
    required: [true, 'Please provide enrollment status'],
    enum: {
      values: ['Enrolled', 'Pending', 'Completed', 'Dropped'],
      message: 'Please select a valid status'
    },
    default: 'Pending'
  }
}, {
  timestamps: true
});

// Index for faster search queries
studentSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Student', studentSchema);