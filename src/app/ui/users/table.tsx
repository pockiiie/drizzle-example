'use client';

import { UserGet } from "@/app/lib/definitions"
import { getUsers } from "@/app/lib/actions"
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function Table({ users }: { users: UserGet[] }) {
  const [stateUsers, setStateUsers] = useState(users);

  const reloadUser = async () => {
    setStateUsers(await getUsers());
  }

  const editUser = (id: number) => {

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
      <table className="min-w-full mt-4 bg-slate-900 border border-slate-900 rounded-lg">
        <thead className="bg-gray-500">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-right">Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            stateUsers?.map((user) => (
              <tr key={user.id} className="odd:bg-slate-800">
                <td className="p-2">{user.name}</td>
                <td>{user.email}</td>
                <td className="text-right">{user.age}</td>
                <td>
                  <div className="flex justify-center items-center">
                    <a
                      href={`/users/${user.id}/update`}
                      className="bg-gray-500 rounded-sm p-1 ml-2 hover:bg-orange-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      className="bg-red-500 rounded-sm p-1 ml-2"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}