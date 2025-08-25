import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-extrabold mb-2">404</h1>
      <p className="text-slate-600 dark:text-slate-300">
        This page could not be found.
      </p>
      <Link className="btn mt-6" to="/">Go Home</Link>
    </div>
  )
}
