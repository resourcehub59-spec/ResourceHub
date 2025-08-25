import React from 'react'
export default function Pagination({ page, totalPages, setPage }){
  if(totalPages<=1) return null
  const pages = Array.from({length: totalPages}, (_,i)=>i+1)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className="btn" disabled={page===1} onClick={()=>setPage(1)}>« First</button>
      <button className="btn" disabled={page===1} onClick={()=>setPage(page-1)}>‹ Prev</button>
      {pages.map(p => (
        <button key={p} className={`btn ${p===page? 'bg-slate-900 text-white': ''}`} onClick={()=>setPage(p)}>{p}</button>
      ))}
      <button className="btn" disabled={page===totalPages} onClick={()=>setPage(page+1)}>Next ›</button>
      <button className="btn" disabled={page===totalPages} onClick={()=>setPage(totalPages)}>Last »</button>
    </div>
  )
}