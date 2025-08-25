import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react"; // ✅ icons

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-12 pb-6 mt-12">
      <div className="container grid md:grid-cols-4 gap-10">
        
        {/* Brand / Intro */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-3">
            📚 ResourceHub
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your hub for books, courses, and job opportunities.  
            Learn, grow, and succeed with curated resources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Explore</h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/books" className="hover:text-blue-400">Books</Link></li>
            <li><Link to="/courses" className="hover:text-blue-400">Courses</Link></li>
            <li><Link to="/jobs" className="hover:text-blue-400">Jobs</Link></li>
            <li><Link to="/catalog" className="hover:text-blue-400">All Resources</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-slate-400">
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Connect</h3>
          <p className="text-slate-400 text-sm mb-3">
            Stay updated with the latest resources and opportunities.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-slate-500 text-sm mt-10 border-t border-slate-700 pt-6">
        © {new Date().getFullYear()} ResourceHub. All rights reserved.
      </div>
    </footer>
  );
}
