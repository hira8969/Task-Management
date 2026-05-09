import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id');
const optionalDate = z.string().optional().nullable();
const checklistItem = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional()
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'review', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    startDate: optionalDate,
    dueDate: optionalDate,
    reminderAt: optionalDate,
    progress: z.number().min(0).max(100).optional(),
    estimatedHours: z.number().min(0).optional(),
    actualHours: z.number().min(0).optional(),
    billingType: z.enum(['non-billable', 'billable']).optional(),
    recurrence: z.enum(['none', 'daily', 'weekly', 'monthly']).optional(),
    tags: z.array(z.string().min(1)).optional(),
    checklist: z.array(checklistItem).optional(),
    assignees: z.array(objectId).optional(),
    labels: z.array(objectId).optional(),
    category: objectId.optional()
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'review', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    startDate: optionalDate,
    dueDate: optionalDate,
    reminderAt: optionalDate,
    progress: z.number().min(0).max(100).optional(),
    estimatedHours: z.number().min(0).optional(),
    actualHours: z.number().min(0).optional(),
    billingType: z.enum(['non-billable', 'billable']).optional(),
    recurrence: z.enum(['none', 'daily', 'weekly', 'monthly']).optional(),
    tags: z.array(z.string().min(1)).optional(),
    checklist: z.array(checklistItem).optional(),
    assignees: z.array(objectId).optional(),
    labels: z.array(objectId).optional(),
    category: objectId.optional().nullable()
  }),
  params: z.object({ id: objectId })
});

export const moveTaskSchema = z.object({
  body: z.object({
    status: z.enum(['todo', 'in-progress', 'review', 'completed']),
    order: z.number().optional()
  }),
  params: z.object({ id: objectId })
});
