'use client'

import { BaseSyntheticEvent, useState } from "react";
import { updateUser, State } from "@/app/lib/actions";
import { useForm } from 'react-hook-form';
import { UserUpdate } from "@/app/lib/definitions";

export default function Form({ user }: { user: UserUpdate }) {

  const initialState: State = { message: null, errors: {} };
  const [state, setState] = useState(initialState);
  const { register, handleSubmit, reset, setValue } = useForm<UserUpdate>();

  setValue('name', user.name, { shouldTouch: true, shouldDirty: true });
  // setValue('email', user.email);
  // setValue('age', user.age);

  const onSubmit = (data: any) => {
    const updateData = { ...data, id: user.id }
    console.log(updateData);
    //   createUser(state, data).then(result => {
    //     setState(result);
    //     if (!result.errors) {
    //       reset();
    //     }
    //   }).catch(e => {
    //     console.error(e);
    //   });
  }

  const onChange = (event: BaseSyntheticEvent) => {
    const target = event.target.name;
    const { errors }: any = state;
    delete errors?.[target];
    setState({ ...state, errors: errors });
    setValue(target, event.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 hidden md:block text-sm font-medium">
          Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              {...register('name')}
              type="text"
              placeholder="Name"
              onChange={onChange}
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div id="customer-error"
            aria-live="polite"
            aria-atomic="true"
            className={
              `${state.errors?.name ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
            }
          >
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
              {...register('email')}
              type="email"
              placeholder="Email"
              onChange={onChange}
              className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${state.errors?.email ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {state.errors?.email && state.errors.email?.map((error: string) => (
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
              {...register('age')}
              type="number"
              placeholder="Age"
              onChange={onChange}
              className="text-black peer block w-1/4 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        <div id="customer-error"
          aria-live="polite"
          aria-atomic="true"
          className={
            `${state.errors?.age ? 'h-8' : 'h-0'} transition-all duration-300 ease-in-out`
          }
        >
          {state.errors?.age && state.errors.age?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <button
          type="submit"
          className="ml-4 flex h-8 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Update
        </button>
      </div>
    </form>
  )
}