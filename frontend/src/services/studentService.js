import axios from 'axios';

const API_URL = '/api/students';

// Get auth token from localStorage
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || '';
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all students with filters and pagination
const getStudents = async (params = {}) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single student
const getStudent = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create new student
const createStudent = async (studentData) => {
  try {
    const response = await api.post('/', studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update student
const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete student
const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get statistics
const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const studentService = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStats,
};

export default studentService;