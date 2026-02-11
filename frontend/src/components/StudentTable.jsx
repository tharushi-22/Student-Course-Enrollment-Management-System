import React from 'react';
import { FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaClock } from 'react-icons/fa';

const StudentTable = ({ 
  students, 
  onEdit, 
  onDelete,
  currentPage = 1,
  totalPages = 1,
  totalStudents = 0,
  onPageChange
}) => {
  
  const getStatusBadge = (status) => {
    const badges = {
      Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
      Enrolled: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      Completed: 'bg-blue-50 text-blue-700 border border-blue-200',
      Dropped: 'bg-rose-50 text-rose-700 border border-rose-200',
    };
    return badges[status] || badges.Pending;
  };

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Calculate showing range
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalStudents);

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-10 text-center border border-gray-100">
        <div className="text-gray-300 text-5xl mb-3">📚</div>
        <h3 className="text-base font-medium text-gray-700 mb-1.5">
          No Students Found
        </h3>
        <p className="text-gray-500 text-xs">
          Start by adding your first student to the system.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200" style={{ backgroundColor: 'oklch(55.4% 0.046 257.417)' }}>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Course</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Data Rows - Show all students from API */}
            {students.map((student) => (
              <tr 
                key={student._id} 
                className="transition-all duration-150 hover:bg-gray-50"
              >
                {/* Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-gray-600">{student.name}</div>
                    {student.status === 'Pending' && (
                      <div className="ml-2">
                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <FaClock className="w-2.5 h-2.5 text-amber-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-700">{student.email}</div>
                </td>

                {/* Phone */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-700">{student.phone}</div>
                </td>

                {/* Course */}
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-800">{student.course}</div>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(student.status)}`}>
                    {student.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-150 hover:scale-105"
                      title="Edit Student"
                    >
                      <FaEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-all duration-150 hover:scale-105"
                      title="Delete Student"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Showing Results - Left Side */}
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex}-{endIndex}</span> of <span className="font-semibold">{totalStudents}</span> results
          </div>

          {/* Pagination Buttons - Right Side */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <FaChevronLeft className="w-3 h-3" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-lg border text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentTable;