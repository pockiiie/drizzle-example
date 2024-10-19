'use server';

import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { z } from 'zod';

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    age?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
}

const UserSchema = z.object({
  id: z.string(),
  name: z.string({ invalid_type_error: 'Name must be string' }).min(1, { message: 'Name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  age: z.number({
    invalid_type_error: "Age must be a number"
  }).gt(0, { message: 'Please enter an amount greater than 0' }),
});

export async function createUser(errorsState: State, formData: FormData) {

  //remove id from UserSchema and validate password and confirm password
  const CreateUser = UserSchema.omit({ id: true })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Password mismatch',
          path: ['confirmPassword']
        })
    });

  // Validate form data using Zod
  const result = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    age: Number(formData.get('age')),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  })

  // If form validation fails, return erros early. Otherwise, continue.
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'Invalid Form',
    }
  }

  // Insert data into database
  const user: typeof usersTable.$inferInsert = result.data;
  await db.insert(usersTable).values(user);
  return {
    message: 'Data added'
  };
}

export async function getUsers() {
    return await db.select().from(usersTable);
}