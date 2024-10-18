import { db } from "@/db"
import { usersTable } from "@/db/schema"


export default async function Table() {
  const users = await db.select().from(usersTable);
  return (
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
          users?.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-right">{user.age}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}