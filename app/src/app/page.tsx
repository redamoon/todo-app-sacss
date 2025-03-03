import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton/LogoutButton';
import FormArea from '@/app/components/FormArea/FormArea';

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const userId = cookieStore.get('userId');
  if (!accessToken) {
    redirect('/login');
  }

  const response = await fetch(`http://localhost:3001/api/todo/task?userId=${userId?.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken.value}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const tasks = await response.json();

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="row-start-1 flex justify-between items-center w-full max-w-4xl">
        <h1 className="text-xl font-bold">TODO App</h1>
        <nav>
          <LogoutButton />
        </nav>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <FormArea initialTasks={tasks} userId={Number(userId?.value)} />
      </main>
      <footer className="row-start-3 flex justify-center items-center w-full max-w-4xl">
        <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 TODO App</p>
      </footer>
    </div>
  );
}
