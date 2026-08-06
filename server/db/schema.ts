import {
  boolean,
  doublePrecision,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const cafes = pgTable("cafes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: text("address").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  priceRange: varchar("price_range", { length: 50 }).notNull(),
  isTwentyFourHours: boolean("is_twenty_four_hours").default(false).notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const facilities = pgTable("facilities", {
  id: uuid("id").defaultRandom().primaryKey(),
  cafeId: uuid("cafe_id").references(() => cafes.id, { onDelete: "cascade" }),
  hasFastWifi: boolean("has_fast_wifi").default(false).notNull(),
  hasPowerOutlets: boolean("has_power_outlets").default(false).notNull(),
  hasIndoor: boolean("has_indoor").default(true).notNull(),
  hasOutdoor: boolean("has_outdoor").default(false).notNull(),
});
