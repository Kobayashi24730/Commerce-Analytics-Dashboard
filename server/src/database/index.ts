import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATA_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

export const db = drizzle(pool, { schema });

pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB connected:", res.rows))
  .catch((err: Error) => console.error("DB connection error:", err));

console.log("LOG URL", process.env.DATA_URL);
