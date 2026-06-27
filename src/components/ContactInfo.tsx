import React from "react";
import { FaEnvelope, FaPhone, FaMapMarker, FaClock, FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import data from "@/data";

const ContactInfo = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {/* Left Column - Contact Info */}
        <div className="space-y-4">
          {data.contactMethods.map((method, index) => (
            <div key={index} className="relative bg-white/80 dark:bg-gray-900/30 rounded-xl px-5 py-3.5 border border-gray-200/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent dark:from-white/5 dark:to-transparent rounded-xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex-shrink-0 text-secondary dark:text-primary/80 text-lg">
                  {method.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-white/80">
                    {method.title}
                  </h4>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-900 dark:text-white hover:text-secondary dark:hover:text-primary transition-colors"
                  >
                    {method.value}
                  </a>
                </div>

                <div className="flex-shrink-0 text-gray-300 dark:text-white/10 group-hover:text-secondary dark:group-hover:text-primary/50 transition-colors">
                  <FaArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* CTA */}
        <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 dark:from-secondary/5 dark:to-primary/5 rounded-xl p-5 border border-secondary/20 dark:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 flex-1 flex items-center justify-between">
          <div className="relative">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Ready to collaborate?
            </h4>
            <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">
              Let's build something amazing
            </p>
          </div>
          <a
            href={data.contactMethods[0].href}
            className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-secondary to-primary dark:from-primary dark:to-secondary text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
          >
            {data.contactMethods[0].title}
            <FaArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Availability Badge */}
      <div
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/30 rounded-full border border-gray-200/50 dark:border-white/10 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs text-gray-600 dark:text-white/50">
            Available for freelance work
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;