import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// get directory of THIS file (db.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// go up TWO levels to project root
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

if (!PGHOST || !PGDATABASE || !PGUSER || !PGPASSWORD) {
  throw new Error("❌ Missing required database environment variables");
}

const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

export default sql;
