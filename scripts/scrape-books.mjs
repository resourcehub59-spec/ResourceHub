// scrapeGoalkicker.js
import axios from "axios";
import * as cheerio from "cheerio";
// import supabase from "../src/lib/supabaseClient.js";
import supabase from "./supabaseServiceClient.mjs";



const BASE_URL = "https://goalkicker.com/";

async function scrapeBooks() {
  console.log("📖 Scraping Goalkicker books...");

  // Load homepage
  const { data: html } = await axios.get(BASE_URL);
  const $ = cheerio.load(html);

  const books = [];

  $("div.bookContainer a").each((_, el) => {
    const relative = $(el).attr("href"); // e.g. "JavaScriptBook/"
    if (!relative) return;

    // Book folder like "JavaScriptBook/"
    const folder = relative.replace("/", "");
    const title = folder.replace("Book", "") + " Notes for Professionals";

    // Direct PDF link pattern
    const pdfUrl = `${BASE_URL}${folder}/${folder.replace(
      "Book",
      ""
    )}NotesForProfessionals.pdf`;

    books.push({
      title,
      description: `Free Goalkicker.com ${title}`,
      category: "Books",
      url: pdfUrl,
      published: true,
    });
  });

  console.log(`✅ Found ${books.length} books`);

  // Insert into Supabase
  for (const book of books) {
    const { error } = await supabase.from("items").insert(book);
    if (error) {
      console.error("❌ Insert failed:", error.message);
    } else {
      console.log("📌 Added:", book.title);
    }
  }

  console.log("🎉 Done inserting all books!");
}

scrapeBooks();
