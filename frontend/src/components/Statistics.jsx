import React from 'react';
import { FaUsers, FaCheckCircle, FaClock, FaTimesCircle, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Statistics = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Students',
      value: stats?.total || 0,
      icon: FaUsers,
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      borderColor: 'border-blue-100',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      delay: 0
    },
    {
      title: 'Enrolled',
      value: stats?.enrolled || 0,
      icon: FaCheckCircle,
      iconBg: 'bg-gradient-to-br from-emerald-500 to-green-500',
      borderColor: 'border-emerald-100',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
      delay: 100
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: FaClock,
      iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      borderColor: 'border-amber-100',
      bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      delay: 200
    },
    {
      title: 'Dropped',
      value: stats?.dropped || 0,
      icon: FaTimesCircle,
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-500',
      borderColor: 'border-rose-100',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
      delay: 300
    },
  ];

  return (
    <div className="mb-8">
    

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.delay / 1000 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="relative group"
          >
            <div className={`relative ${stat.bgColor} border ${stat.borderColor} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                
                <div className={`${stat.iconBg} p-3 rounded-xl shadow-lg`}>
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Statistics;