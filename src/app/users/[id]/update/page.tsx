
import { getUser } from '@/app/lib/actions';
import UpdateForm from '@/app/ui/users/update-form';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: number } }) {
  const user = await getUser(params.id);
  return (
    <>
      <Suspense>
        <UpdateForm user={user[0]} />
      </Suspense>
    </>
  )
}