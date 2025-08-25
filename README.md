# ProSite (React) — Books, Jobs & Courses Hub

A fast, modern **React + Vite + Tailwind** site for posting links to **free/paid books, jobs & opportunities, and courses** — with a powerful **Admin Panel** (front-end only) that uses your browser's LocalStorage (no account needed yet).

## ✅ What you get
- Beautiful, professional UI (responsive + animations with Framer Motion)
- Pages: Home, Catalog (All/Books/Jobs/Courses), Admin
- Catalog features: search, filters (type, free/paid, tags), sort, pagination
- Item cards with badges, price ("Free" vs paid), popularity counter
- Admin: **Create / Edit / Delete**, publish toggle, **Import/Export JSON**, **Reset to Seed**
- Performance: Vite + Tailwind, dynamic list rendering
- Accessibility: semantic HTML, labels, keyboard-friendly controls

---

## 🧰 Quick Start (Easy)
1) **Install Node.js** (version 18+ recommended): https://nodejs.org
2) Open a terminal in this folder and run:
```bash
npm install
npm run dev
```
3) Open the shown URL (usually `http://localhost:5173`).

### Build for production
```bash
npm run build
npm run preview
```
Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

---

## 🔐 Admin (no auth yet)
- Go to **/admin** or use the top-right **Admin** button.
- All data is stored in your browser's LocalStorage (you can export JSON to back up).
- Later, we can plug in real authentication and a backend without changing the UI.

---

## 🧠 Data model (per item)
```json
{
  "id": "string",
  "type": "book|job|course",
  "title": "string",
  "description": "string",
  "url": "https://...",
  "price": 0,
  "tags": ["string"],
  "category": "string",
  "published": true,
  "thumbnail": "https://... (optional)",
  "source": "string (e.g., GitHub, Coursera)",
  "dateAdded": "YYYY-MM-DD",
  "clicks": 0
}
```

---

## 🧾 Tips
- Use **Export JSON** in Admin to save a backup. **Import JSON** to restore/update.
- Use **Reset to Seed** to reload sample data from `src/assets/seed.json`.
- Customize colors/fonts by editing `tailwind.config.js` and `src/index.css`.

---

© 2025 ProSite. Built with ❤️