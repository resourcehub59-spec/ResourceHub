import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard.jsx";
import FooterCard from "../components/FooterCard.jsx";

export default function Home({ items, onClick }) {
  return (
    <>
      <Helmet>
        <title>ResourceHub - Your hub for Books, Courses & Jobs</title>
        <meta
          name="description"
          content="Discover and manage the best free and paid resources—all in one place. Stay updated with the latest courses, books, and career opportunities."
        />
      </Helmet>

      {/* ✅ Background / text swap depending on theme */}
      <section className="bg-white dark:bg-backgroundDark text-slate-900 dark:text-slate-100">
        {/* Hero Section */}
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Your hub for{" "}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Books, Courses & Jobs
                </span>
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6">
                Discover and manage the best free and paid resources—all in one
                place. Stay updated with the latest courses, books, and career
                opportunities.
              </p>
              <div className="flex gap-3">
                <Link to="/catalog" className="btn-primary">
                  Explore Catalog
                </Link>
                <Link to="/signup" className="btn">
                  Sign Up
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* ✅ Card background changes with theme */}
              <div className="card p-6 shadow-lg shadow-blue/20 hover:shadow-blue/40 transition bg-white dark:bg-backgroundDark border border-slate-200 dark:border-slate-700 rounded-2xl">
                {/* Responsive grid: 1 mobile, 2 tablet, 2 desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {items.slice(0, 4).map((it) => (
                    <ItemCard key={it.id} item={it} onClick={onClick} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Featured Resources Section */}
        <div className="container py-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 text-center">
            Featured Resources
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-center mb-8">
            Curated selections to help you learn, grow, and succeed.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Books",
                desc: "Handpicked books to boost your knowledge.",
                badge: "Book",
                button: "View",
                to: "/books",
              },
              {
                title: "Courses",
                desc: "Top online courses to improve your skills.",
                badge: "Course",
                button: "Explore",
                to: "/courses",
              },
              {
                title: "Jobs",
                desc: "Latest opportunities to grow your career.",
                badge: "Job",
                button: "Apply",
                to: "/jobs",
              },
            ].map((f, i) => (
              <FooterCard key={i} {...f} />
            ))}
          </div>
        </div>

        {/* Bottom Feature Card */}
        <div className="border-t border-slate-200 dark:border-slate-800">
          <div className="container py-12 grid md:grid-cols-1 gap-6">
            <FooterCard
              title="Stay Updated"
              desc="Sign up to receive the latest updates on new books, courses, and job opportunities."
              badge="Feature"
              button="Sign Up"
              to="/signup"
            />
          </div>
        </div>
      </section>
    </>
  );
}
