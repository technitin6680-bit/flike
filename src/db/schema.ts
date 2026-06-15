import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, json, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  role: text('role').notNull().default('client'), // 'client' or 'admin'
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  status: text('status').notNull().default('Submitted'), // Submitted, Under Review, etc.
  websiteType: text('website_type').notNull(),
  websiteName: text('website_name').notNull(),
  businessName: text('business_name').notNull(),
  description: text('description').notNull(),
  requiredFeatures: json('required_features').notNull(), // Array of selected feature names
  domainOption: text('domain_option').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  emailAddress: text('email_address').notNull(),
  
  // Optional Fields
  logoUrl: text('logo_url'),
  imagesUrls: json('images_urls'),
  referenceLinks: text('reference_links'),
  preferredTheme: text('preferred_theme'),
  notes: text('notes'),
  
  totalEstimatedCost: integer('total_estimated_cost').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  orderId: integer('order_id').references(() => orders.id),
  status: text('status').notNull().default('Open'), // Open, In Progress, Resolved, Closed
  subject: text('subject').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  supportTickets: many(supportTickets),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  client: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  supportTickets: many(supportTickets),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
  client: one(users, {
    fields: [supportTickets.userId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [supportTickets.orderId],
    references: [orders.id],
  }),
}));
