import { integer, pgTable, varchar, text, serial, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel } from 'drizzle-orm';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text('password').notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .references(() => usersTable.id)
    .notNull(),
  expiresAt: timestamp('expires_at').notNull(),
});

export type NewUser = InferInsertModel<typeof usersTable>;
export type NewSession = InferInsertModel<typeof sessions>;

