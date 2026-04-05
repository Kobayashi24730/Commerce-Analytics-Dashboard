import type { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATA_URL!,
    ssl: {
      rejectUnauthorized: false,
    },
  },
} satisfies Config;
