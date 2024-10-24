'use server';

import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { z } from 'zod';
import { UserCreate, UserUpdate, UserGet } from './definitions';
import { DrizzleError, sql } from 'drizzle-orm';

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    age?: string[];
    password?: string[];
    confirmPassword?: string[];
  }
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

export async function createUser(prevState: FormState, formData: FormData) {

  // Remove id from UserSchema and validate password and confirm password
  // superRefine is zod validation function
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
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    age: Number(formData.get('age')),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  })

  // If form validation fails, return erros early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid Form',
    }
  }

  // Insert data into database
  const user: typeof usersTable.$inferInsert = validatedFields.data;
  let insertedData = null;
  try {
    insertedData = await db.insert(usersTable).values(user);
  } catch (err: any) {
    // Unique email error from database
    if (err?.constraint == 'users_email_unique') {
      return {
        errors: { email: ['email is taken'] },
        message: `${err?.detail}`,
      }
    }
    // If there are any errors
    return {
      message: `Fail to insert data - ${err?.constraint} ${err?.detail}`,
    }
  }

  // SUCCESS
  return {
    message: 'Data added',
  };
}

export async function getUsers() {
  return await db.select().from(usersTable).orderBy(sql`${usersTable.id} desc nulls first`);
}

export async function getUser(id: number) {
  return await db.select({
    id: usersTable.id,
    name: usersTable.name,
    email: usersTable.email,
    age: usersTable.age
  }).from(usersTable).where(sql`${usersTable.id} = ${id}`);
}

export async function updateUser(errorState: FormState, data: UserUpdate) {

}