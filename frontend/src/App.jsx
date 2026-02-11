import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlus } from "react-icons/fa";

import Header from "./components/Header";
import Statistics from "./components/Statistics";
import SearchFilter from "./components/SearchFilter";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import ConfirmDialog from "./components/ConfirmDialog";
import Login from "./components/Login";

import studentService from "./services/studentService";
import authService from "./services/authService";

function App() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);

  // Check for logged in user on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  // Fetch students and stats
  useEffect(() => {
    if (user) {
      fetchStudents();
      fetchStats();
    }
  }, [user, searchTerm, courseFilter, statusFilter, currentPage]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchStudents();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (searchTerm) params.search = searchTerm;
      if (courseFilter !== "All") params.course = courseFilter;
      if (statusFilter !== "All") params.status = statusFilter;

      const response = await studentService.getStudents(params);
      setStudents(response.data);
      setTotalPages(response.totalPages);
      setTotalStudents(response.total);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await studentService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.data);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    setStudents([]);
    setStats(null);
    toast.info("Logged out successfully");
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setShowForm(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowConfirm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormLoading(true);
      if (selectedStudent) {
        await studentService.updateStudent(selectedStudent._id, formData);
        toast.success("Student updated successfully!");
      } else {
        await studentService.createStudent(formData);
        toast.success("Student added successfully!");
      }
      setShowForm(false);
      setSelectedStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setFormLoading(true);
      await studentService.deleteStudent(selectedStudent._id);
      toast.success("Student deleted successfully!");
      setShowConfirm(false);
      setSelectedStudent(null);
      fetchStudents();
      fetchStats();
    } catch (error) {
      toast.error(error.message || "Failed to delete student");
    } finally {
      setFormLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} onRegister={handleRegister} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Student Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-700">
              Student Course Enrollment Management
            </h2>
            <div className="inline-flex items-center px-3 py-1.5 mt-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              Total: {totalStudents} student{totalStudents !== 1 ? "s" : ""}
            </div>
          </div>
          <button
            onClick={handleAddStudent}
            className="btn btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Add Student</span>
          </button>
        </div>

        {/* Statistics */}
        <Statistics stats={stats} />

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Student Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading students...</p>
          </div>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEditStudent}
            onDelete={handleDeleteClick}
            currentPage={currentPage}
            totalPages={totalPages}
            totalStudents={totalStudents}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Modals */}
      {showForm && (
        <StudentForm
          student={selectedStudent}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setSelectedStudent(null);
          }}
          isLoading={formLoading}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          title="Delete Student"
          message={`Are you sure you want to delete ${selectedStudent?.name}? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setSelectedStudent(null);
          }}
          isLoading={formLoading}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
