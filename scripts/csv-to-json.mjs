// scripts/csv-to-json.mjs
import fs from "fs";
import { parse } from "csv-parse/sync";

// Get args
const [,, inputFile, outputFile] = process.argv;

if (!inputFile || !outputFile) {
  console.error("Usage: node scripts/csv-to-json.mjs input.csv output.json");
  process.exit(1);
}

try {
  const csvData = fs.readFileSync(inputFile, "utf8");

  // Parse CSV
  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true
  });

  // Optional: Add category field for grouping in DB
  const withCategory = records.map(r => ({
    ...r,
    category: "Courses"
  }));

  fs.writeFileSync(outputFile, JSON.stringify(withCategory, null, 2));
  console.log(`✅ Converted ${inputFile} -> ${outputFile}`);
} catch (err) {
  console.error("❌ Error converting CSV to JSON:", err);
  process.exit(1);
}
