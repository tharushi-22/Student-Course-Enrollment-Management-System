import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ConfirmDialog = ({ title, message, onConfirm, onCancel, isLoading }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger flex items-center space-x-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;