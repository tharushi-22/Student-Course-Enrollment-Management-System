import React from 'react';
import { FaSearch, FaBook, FaCheckCircle, FaTimes } from 'react-icons/fa';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  courseFilter, 
  setCourseFilter, 
  statusFilter, 
  setStatusFilter 
}) => {
  const courses = [
    'All', 'Computer Science', 'Information Technology', 'Software Engineering',
    'Data Science', 'Cybersecurity', 'Web Development', 'Mobile Development', 'Cloud Computing',
  ];

  const statuses = ['All', 'Enrolled', 'Pending', 'Completed', 'Dropped'];

  const handleClearFilters = () => {
    setSearchTerm('');
    setCourseFilter('All');
    setStatusFilter('All');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-lg">
      {/* Title Section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Filters</h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Course Filter */}
        <div className="w-full lg:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBook className="text-gray-400" />
            </div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white outline-none cursor-pointer transition-colors shadow-sm hover:border-gray-400"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course === 'All' ? 'All Courses' : course}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCheckCircle className="text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white outline-none cursor-pointer transition-colors shadow-sm hover:border-gray-400"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Status' : status}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="w-full lg:w-auto">
          <button
            onClick={handleClearFilters}
            className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-200 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 hover:border-blue-300 active:bg-blue-200 transition-colors font-medium shadow-sm"
          >
            <FaTimes className="text-sm" />
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;