import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard.jsx'
import Filters from '../components/Filters.jsx'
import Pagination from '../components/Pagination.jsx'

const PAGE_SIZE = 12

export default function Catalog({ items, onClick, heading='All' }) {
  const [query, setQuery] = useState({
    query: '', type: 'all', price: 'all', tag: 'all', sort: 'newest'
  })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let arr = items.filter(i => i.published)
    if (query.type !== 'all') arr = arr.filter(i => i.type === query.type)
    if (query.price === 'free') arr = arr.filter(i => (i.price || 0) == 0)
    if (query.price === 'paid') arr = arr.filter(i => (i.price || 0) > 0)
    if (query.tag !== 'all') arr = arr.filter(i => (i.tags || []).includes(query.tag))
    if (query.query) {
      const q = query.query.toLowerCase()
      arr = arr.filter(i =>
        i.title.toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q) ||
        (i.category || '').toLowerCase().includes(q) ||
        (i.tags || []).some(t => t.toLowerCase().includes(q))
      )
    }
    switch (query.sort) {
      case 'popular': arr = arr.slice().sort((a, b) => (b.clicks || 0) - (a.clicks || 0)); break
      case 'price-asc': arr = arr.slice().sort((a, b) => (a.price || 0) - (b.price || 0)); break
      case 'price-desc': arr = arr.slice().sort((a, b) => (b.price || 0) - (a.price || 0)); break
      case 'title': arr = arr.slice().sort((a, b) => a.title.localeCompare(b.title)); break
      default: arr = arr.slice().sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    }
    return arr
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const shown = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="container py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">{heading}</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Search, filter and sort the resources.
          </p>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      <Filters items={items} value={query} onChange={(q) => { setPage(1); setQuery(q) }} />

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shown.map(it => <ItemCard key={it.id} item={it} onClick={onClick} />)}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </section>
  )
}
