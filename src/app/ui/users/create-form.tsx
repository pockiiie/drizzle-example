'use client'

import { User } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useFormState } from "react-dom";
import { createUser, State } from "@/app/lib/actions";

export default function Form() {
  // ✅ Form Elements
  // ✅ Validation
  // ✅ Action
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createUser, initialState);

  return (
    <form action={formAction}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 hidden md:block text-sm font-medium">
          Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && state.errors.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2 hidden md:block text-sm font-medium">
          Email
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email && state.errors.email?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="mb-2 hidden md:block text-sm font-medium">
          Password
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="text-black peer block w-1/2 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password && state.errors.password?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="mb-2 hidden md:block text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Password Confirmation"
              className="text-black peer block w-1/2 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.confirmPassword && state.errors.confirmPassword?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="age" className="mb-2 text-sm font-medium hidden md:block">
          Age
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              className="text-black peer block w-1/4 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.age && state.errors.age?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          type="reset"
          className="ml-4 flex h-8 items-center rounded-lg bg-red-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Reset
        </button>
        <button
          type="submit"
          className="ml-4 flex h-8 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Cretate
        </button>
      </div>
    </form>
  )
}