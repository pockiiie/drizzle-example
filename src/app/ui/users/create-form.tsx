'use client'

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { createUser, FormState } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function Form() {
  const initFormState: FormState = { errors: {}, message: null };
  const [formState, formAction, isPending] = useFormState(createUser, initFormState);
  const [formErrors, setErrors] = useState({ ...initFormState.errors });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formState?.errors) {
      formRef.current?.reset();
    }
    const errors = { ...formState.errors }
    setErrors(errors);
  }, [formState]);

  const handleChange = (event: BaseSyntheticEvent) => {
    const { target } = event;
    const errors: any = { ...formErrors };
    delete errors?.[target.name];
    setErrors(errors);
  }

  return (
    <form ref={formRef} action={formAction}>
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
              onChange={handleChange}
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="customer-error"
            aria-live="polite"
            aria-atomic="true"
            className={
              `${formErrors?.name ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
            }
          >
            {formErrors?.name && formErrors.name?.map((error: string) => (
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
              onChange={handleChange}
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${formErrors?.email ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {formErrors?.email && formErrors.email?.map((error: string) => (
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
              onChange={handleChange}
              className="text-black peer block w-1/2 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${formErrors?.password ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {formErrors?.password && formErrors.password?.map((error: string) => (
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
              onChange={handleChange}
              className="text-black peer block w-1/2 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${formErrors?.confirmPassword ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {formErrors?.confirmPassword && formErrors.confirmPassword?.map((error: string) => (
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
              onChange={handleChange}
              className="text-black peer block w-1/4 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${formErrors?.age ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {formErrors?.age && formErrors.age?.map((error: string) => (
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
          Create
        </button>
      </div>
    </form>
  )
}