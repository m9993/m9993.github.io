import React from "react";
import { motion } from "framer-motion";
import data from "@/data";

const ContactInfo = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Reach out through any of these direct channels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-all"
            >
              <div className="p-4 mb-6 rounded-full bg-gray-100 dark:bg-gray-700">
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {method.title}
              </h3>
              <a
                href={method.href}
                className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline mb-3"
              >
                {method.value}
              </a>
              <p className="text-gray-600 dark:text-gray-400">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Preferred Contact Method
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Email is the fastest way to reach me. I typically respond within 24
            hours during weekdays.
          </p>
          <a
            href="mailto:muntasiralam9993@gmail.com"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-colors"
          >
            Send an Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
