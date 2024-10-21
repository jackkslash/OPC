import { pgTable, serial, timestamp, varchar, text, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const courses = pgTable('courses', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    public: boolean('public').default(false),
});

export const units = pgTable('units', {
    id: serial('id').primaryKey(),
    courseId: integer('course_id').notNull().references(() => courses.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    public: boolean('public').default(false),
    position: integer('position').default(0),
});

export const lessons = pgTable('lessons', {
    id: serial('id').primaryKey(),
    unitId: integer('unit_id').notNull().references(() => units.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    videoId: varchar('video_id', { length: 255 }),
    public: boolean('public').default(false),
    position: integer('position').default(0),
});

// Relations
export const coursesRelations = relations(courses, ({ many }) => ({
    units: many(units),
}));

export const unitsRelations = relations(units, ({ one, many }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
}));

// Types
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;

export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;