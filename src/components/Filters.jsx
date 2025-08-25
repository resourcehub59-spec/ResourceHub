import React, { useMemo } from 'react'
import { uniq } from '../utils/format.js'

export default function Filters({ items, value, onChange }){
  const tags = useMemo(()=> uniq(items.flatMap(i=>i.tags||[])).sort(), [items])
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <input className="input" placeholder="Search..." value={value.query}
        onChange={(e)=>onChange({ ...value, query: e.target.value })} />
      <select className="select" value={value.type}
        onChange={(e)=>onChange({ ...value, type: e.target.value })}>
        <option value="all">All types</option>
        <option value="book">Books</option>
        <option value="job">Jobs & Opportunities</option>
        <option value="course">Courses</option>
      </select>
      <select className="select" value={value.price}
        onChange={(e)=>onChange({ ...value, price: e.target.value })}>
        <option value="all">Price: All</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
      <select className="select" value={value.tag}
        onChange={(e)=>onChange({ ...value, tag: e.target.value })}>
        <option value="all">Tag: Any</option>
        {tags.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <div className="md:col-span-4 flex items-center gap-2">
        <label className="label">Sort</label>
        <select className="select w-auto" value={value.sort}
          onChange={(e)=>onChange({ ...value, sort: e.target.value })}>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title">Title A→Z</option>
        </select>
      </div>
    </div>
  )
}