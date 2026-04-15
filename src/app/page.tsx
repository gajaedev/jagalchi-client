import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE_KEY = 'jagalchi-session';

export default async function Home() {
  const cookieStore = await cookies();
  const hasSession = cookieStore.get(SESSION_COOKIE_KEY)?.value === '1';

  if (hasSession) {
    redirect('/myroadmap');
  } else {
    redirect('/login');
  }
}
