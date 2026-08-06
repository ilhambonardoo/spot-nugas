import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const config = useRuntimeConfig();

const queryClient = postgres(config.databaseUrl, {
  max: 1,
  ssl: "require",
});

export const db = drizzle(queryClient);
