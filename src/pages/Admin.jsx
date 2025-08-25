import React, { useMemo, useRef, useState } from "react";

const fresh = () => ({
  id: "",
  type: "book", // default type
  title: "",
  description: "",
  url: "",
  price: 0,
  tags: "",
  category: "",
  published: true,
  thumbnail: "",
  source: "",
  clicks: 0,
});

export default function Admin({ data, api }) {
  const [form, setForm] = useState(fresh());
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef();

  // ✅ Sort by created_at
  const items = useMemo(
    () =>
      (data.items || []).slice().sort(
        (a, b) =>
          new Date(b.created_at || 0) - new Date(a.created_at || 0)
      ),
    [data.items]
  );

  const parseTags = (val) =>
    String(val || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price || 0),
      tags: parseTags(form.tags),
    };

    if (editingId) {
      api.update(editingId, payload);
    } else {
      const id = crypto.randomUUID();
      api.add({ ...payload, id });
    }

    setForm(fresh());
    setEditingId(null);
  };

  const startEdit = (it) => {
    setEditingId(it.id);
    setForm({ ...it, tags: (it.tags || []).join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onImport = async (file) => {
    const text = await file.text();
    try {
      const json = JSON.parse(text);
      if (Array.isArray(json.items)) {
        api.replaceAll(json.items);
      } else if (Array.isArray(json)) {
        api.replaceAll(json);
      } else {
        alert("Invalid JSON. Expect { items: [...] } or [ ... ]");
      }
    } catch (err) {
      alert("Failed to parse JSON");
    }
  };

  const onExport = () => {
    const blob = new Blob(
      [JSON.stringify({ items: data.items }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prosite-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="container py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage items, import/export JSON, toggle publish, track popularity.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn" onClick={() => fileRef.current?.click()}>
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) onImport(e.target.files[0]);
              e.target.value = ""; // ✅ allow re-import same file
            }}
          />
          <button className="btn" onClick={onExport}>
            Export JSON
          </button>
          <button className="btn" onClick={() => api.reset()}>
            Reset to Seed
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="card p-6 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="label">Title</label>
          <input
            className="input"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="md:col-span-3">
          <label className="label">Description</label>
          <textarea
            className="input h-24"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="label">Type</label>
          <select
            className="select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="book">Book</option>
            <option value="job">Job/Opportunity</option>
            <option value="course">Course</option>
          </select>
        </div>
        <div>
          <label className="label">URL</label>
          <input
            className="input"
            required
            type="url"
            placeholder="https://..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Price</label>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Tags (comma separated)</label>
          <input
            className="input"
            placeholder="e.g. javascript, beginner"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Category</label>
          <input
            className="input"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Source</label>
          <input
            className="input"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Thumbnail URL</label>
          <input
            className="input"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            className="rounded"
            checked={form.published}
            onChange={(e) =>
              setForm({ ...form, published: e.target.checked })
            }
          />
          <label htmlFor="published">Published</label>
        </div>
        <div className="md:col-span-3 flex items-center gap-3">
          <button className="btn-primary" type="submit">
            {editingId ? "Update Item" : "Add Item"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEditingId(null);
                setForm(fresh());
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Desktop table */}
      <div className="mt-8 card p-6 overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Tags</th>
              <th>Source</th>
              <th>Published</th>
              <th>Clicks</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr
                key={it.id}
                className="border-t border-slate-200 dark:border-slate-800"
              >
                <td className="pr-4">{it.title}</td>
                <td className="pr-4 capitalize">{it.type}</td>
                <td className="pr-4">
                  {it.price === 0 ? "Free" : `$${Number(it.price).toFixed(2)}`}
                </td>
                <td className="pr-4 text-slate-500">
                  {(it.tags || []).join(", ")}
                </td>
                <td className="pr-4">{it.source || "-"}</td>
                <td className="pr-4">{it.published ? "✅" : "❌"}</td>
                <td className="pr-4">{it.clicks || 0}</td>
                <td className="pr-4">
                  {it.created_at
                    ? new Date(it.created_at).toLocaleDateString()
                    : "-"}
                </td>
                <td className="flex gap-2 py-2">
                  <button className="btn" onClick={() => startEdit(it)}>
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      api.update(it.id, { published: !it.published })
                    }
                  >
                    {it.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      if (confirm(`Delete "${it.title}"?`)) api.remove(it.id);
                    }}
                  >
                    Delete
                  </button>
                  <a
                    className="btn"
                    href={it.url}
                    target="_blank"
                    rel="noopener"
                    onClick={() => api.click(it.id)}
                  >
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid gap-3 mt-6">
        {items.map((it) => (
          <div
            key={it.id}
            className="rounded-2xl ring-1 ring-slate-200 dark:ring-slate-800 p-4 bg-white dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm uppercase tracking-wide text-slate-500">
                  {it.type}
                </div>
                <h3 className="font-semibold">{it.title}</h3>
              </div>
              <span className="text-xs px-2 py-1 rounded-full ring-1 ring-slate-200 dark:ring-slate-700">
                {it.published ? "Published" : "Draft"}
              </span>
            </div>
            {it.thumbnail && (
              <img
                src={it.thumbnail}
                alt={it.title}
                className="mt-2 w-full h-40 object-cover rounded-lg"
              />
            )}
            {it.description && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                {it.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <a
                href={it.url}
                target="_blank"
                rel="noopener"
                onClick={() => api.click(it.id)}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Open
              </a>
              <button
                onClick={() => startEdit(it)}
                className="px-3 py-2 rounded-xl ring-1 ring-slate-200 dark:ring-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${it.title}"?`)) api.remove(it.id);
                }}
                className="px-3 py-2 rounded-xl ring-1 ring-red-200 text-red-600 dark:ring-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
