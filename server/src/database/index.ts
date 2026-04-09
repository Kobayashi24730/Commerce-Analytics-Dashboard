import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";
import dns from "dns";

// Prefer IPv4 to avoid ENETUNREACH on hosts that resolve to IPv6 first.
dns.setDefaultResultOrder("ipv4first");

const connectionString =
  process.env.DATA_URL || process.env.DATABASE_URL || "";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, { schema });

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB connected:", res.rows))
  .catch((err: Error) => console.error("DB connection error:", err));

console.log("LOG URL", connectionString);
