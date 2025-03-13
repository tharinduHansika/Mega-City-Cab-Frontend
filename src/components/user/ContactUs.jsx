import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    const currentTime = new Date().toLocaleString(); // Add current time for the template

    emailjs.send(
      'service_eb4bsjc',           // Correct Service ID
      'template_d1o8yuu',          // Template ID
      { ...formData, time: currentTime }, // Include time in the data
      '-LaJXGOc00QBek-u4'         // User ID (Public Key)
    )
      .then((result) => {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('Failed to send message. Please try again.');
      })
      .finally(() => setIsSending(false));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-gray-900 to-yellow-300 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg"
        >
          Contact Us
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-blue-100 max-w-2xl mx-auto mt-4"
        >
          We'd love to hear from you! Drop us a message below.
        </motion.p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white/90 rounded-xl p-8 shadow-2xl border-4 border-gray-900"
      >
        <form onSubmit={sendEmail}>
          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="name" className="block text-lg font-semibold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border-2 border-yellow-500 focus:border-gray-900 focus:outline-none transition-all"
              placeholder="Your Name"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border-2 border-yellow-500 focus:border-gray-900 focus:outline-none transition-all"
              placeholder="Your Email"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="message" className="block text-lg font-semibold text-gray-900 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-3 rounded-lg border-2 border-yellow-500 focus:border-gray-900 focus:outline-none transition-all"
              placeholder="Your Message"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSending}
            whileHover={{ scale: isSending ? 1 : 1.05 }}
            whileTap={{ scale: isSending ? 1 : 0.95 }}
            className={`w-full bg-gray-900 text-white font-bold py-3 rounded-lg transition-all duration-300 ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}
          >
            {status}
          </motion.p>
        )}
      </motion.div>

      {/* Contact Info */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants} className="bg-yellow-500 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900">Phone</h3>
          <p className="text-white">+1 (555) 123-4567</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-500">Email</h3>
          <p className="text-white">support@megacitycab.com</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-yellow-500 p-6 rounded-lg text-center shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900">Address</h3>
          <p className="text-white">123 Cab Lane, Megacity</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;