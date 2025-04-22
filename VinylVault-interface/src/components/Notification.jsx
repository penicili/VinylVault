import React from 'react';

const Notification = ({ show, message, type = 'success' }) => {
  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
                 type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 
                 'bg-blue-100 border-blue-400 text-blue-700';

  return (
    <div className={`${bgColor} px-4 py-3 rounded fixed top-4 right-4 z-50 shadow-md`}>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Notification;