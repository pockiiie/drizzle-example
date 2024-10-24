import UserForm from '@/app/ui/users/create-form';
import UserTable from '@/app/ui/users/table';
import { getUsers } from '@/app/lib/actions';

export default async function Page() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-2xl">Users</h1>
      <section className="mt-4">
        <UserTable users={users} />
      </section>
      <section className="mt-4">
        <header className="text-xl">Create User</header>
        <UserForm />
      </section>
    </div>
  );
}