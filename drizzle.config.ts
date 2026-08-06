import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.configDotenv({ path: ".env" });

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URl!,
  },
});
