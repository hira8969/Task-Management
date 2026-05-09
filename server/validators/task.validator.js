import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'review', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    dueDate: z.string().optional(),
    assignees: z.array(z.string()).optional(),
    labels: z.array(z.string()).optional(),
    category: z.string().optional()
  })
});

export const moveTaskSchema = z.object({
  body: z.object({
    status: z.enum(['todo', 'in-progress', 'review', 'completed']),
    order: z.number().optional()
  }),
  params: z.object({ id: z.string() })
});
