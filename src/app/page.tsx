import UserForm from '@/app/ui/users/create-form';
import UserTable from '@/app/ui/users/table';
import { getUsers } from '@/app/lib/actions';
import Link from 'next/link';

export default async function Home() {
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-2xl">Home</h1>
    </div>
  );
}
