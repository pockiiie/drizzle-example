'use client';

import { User } from "@/app/lib/definitions"
import { getUsers } from "@/app/lib/actions"
import { useState } from "react";


export default function Table({ users }: { users: User[] }) {
  const [stateUsers, setStateUsers] = useState(users);

  const reloadUser = async () => {
    setStateUsers(await getUsers());
  }

  return (
    <>
      <div className="w-full flex justify-end">
        <button
          onClick={reloadUser}
          className="ml-4 flex h-8 items-center rounded-lg bg-slate-300 px-4 text-sm font-medium text-black transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          Refresh
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-right">Age</th>
          </tr>
        </thead>
        <tbody>
          {
            stateUsers?.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-right">{user.age}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}