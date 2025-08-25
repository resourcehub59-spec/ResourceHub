import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FooterCard({ title, desc, badge, button, to }) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="card p-6 rounded-2xl shadow-lg shadow-blue/20 hover:shadow-blue/40 hover:scale-105 transition-transform 
                 bg-white dark:bg-backgroundDark 
                 border border-slate-200 dark:border-slate-700"
    >
      {badge && (
        <span
          className="badge border border-blue-200 dark:border-blue-700 
                     bg-blue-100 dark:bg-blue-900 
                     text-blue-900 dark:text-blue-300 
                     px-2 py-1 text-xs font-medium rounded mb-3 inline-block"
        >
          {badge}
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
        {title}
      </h3>

      <p className="text-slate-700 dark:text-slate-300 mb-4">{desc}</p>

      {button && to && (
        <Link
          to={to}
          className="btn-primary transition-transform hover:scale-105 inline-block"
        >
          {button}
        </Link>
      )}
    </motion.div>
  );
}
