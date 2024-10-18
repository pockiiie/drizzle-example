import Image from 'next/image';
import UserForm from './ui/users/create-form'
import UserTable from './ui/users/table'

export default async function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl">Drizzle Example</h1>
      <section className="mt-4">
        <header className="text-xl">Create User</header>
        <UserForm />
      </section>
      <section className="mt-4">
        <header className="text-xl">User List</header>
        <UserTable />
      </section>
    </div>
  );
}
