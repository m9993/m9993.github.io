import React from "react";
import { FaEnvelope, FaPhone, FaMapMarker, FaClock, FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import data from "@/data";

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Left Column - Contact Info */}
        <div className="space-y-4">
          {data.contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative bg-white/80 dark:bg-gray-900/30 rounded-xl px-5 py-3.5 border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 dark:to-transparent rounded-xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex-shrink-0 text-secondary dark:text-primary/80 text-lg">
                  {method.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white/80">
                    {method.title}
                  </h4>
                  <p className="text-sm text-gray-900 dark:text-white group-hover:text-secondary dark:group-hover:text-primary transition-colors">
                    {method.value}
                  </p>
                </div>

                <div className="flex-shrink-0 text-gray-300 dark:text-white/10 group-hover:text-secondary dark:group-hover:text-primary/50 transition-colors">
                  <FaArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right Column - Clean CTA */}
        <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/5 dark:to-primary/5 rounded-xl p-6 border border-secondary/20 dark:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-center">
          <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-primary/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-secondary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Let's Talk
          </h4>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-1">
            Have a project in mind? I'd love to hear about it.
          </p>
          <a
            href={data.contactMethods[0].href}
            className="mt-4 px-6 py-2.5 bg-secondary dark:bg-primary text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            Get in Touch
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Availability Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-gray-900/30 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs text-gray-600 dark:text-white/50">
            Available for freelance work
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;