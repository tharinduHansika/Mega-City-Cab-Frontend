// src/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', image: 'https://via.placeholder.com/150' },
    { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/150' },
    { name: 'Alice Johnson', role: 'Marketing', image: 'https://via.placeholder.com/150' },
    { name: 'Bob Brown', role: 'Driver Manager', image: 'https://via.placeholder.com/150' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-yellow-500 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
        >
          About Megacity Cab
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl text-blue-100 max-w-2xl mx-auto"
        >
          Your premier choice for safe, reliable, and colorful transportation!
        </motion.p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white/90 rounded-xl p-8 mb-12 shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg">
          At Megacity Cab, we're dedicated to revolutionizing urban transportation with a splash of color and comfort. 
          Our vibrant yellow and blue cabs are here to brighten your day while getting you where you need to go!
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-md">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white rounded-lg p-6 shadow-lg border-2 border-yellow-500 hover:border-blue-950 transition-all duration-300"
            >
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-300"
              />
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-yellow-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="bg-yellow-500 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-4xl font-bold text-gray-900">500+</h3>
          <p className="text-white">Happy Drivers</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-4xl font-bold text-yellow-500">1M+</h3>
          <p className="text-white">Rides Completed</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-yellow-500 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-4xl font-bold text-gray-900">24/7</h3>
          <p className="text-white">Support</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;