import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis").email("Format email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  name: z.string().min(1, "Le nom est requis"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  name: string;
  password?: string;
};

export const insertTaskSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  status: z.string().default("todo"),
  priority: z.string().default("medium"),
  category: z.string().default("feature"),
  userId: z.number(),
  assigneeId: z.number().optional().nullable(),
  dueDate: z.date().optional().nullable(),
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = InsertTask & {
  id: number;
  createdAt: Date;
};