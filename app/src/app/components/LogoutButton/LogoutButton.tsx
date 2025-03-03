'use client'

import React from 'react';
import { useRouter } from 'next/navigation';


const LogoutButton: React.FC = () => {
  const router = useRouter()

  const logout = () => {
    fetch('/api/auth/session', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Session data:', data);
        router.push('/');
      })
      .catch((error) => {
        console.error('Error fetching session:', error);
      });

  };

  return (
    <button onClick={logout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
      ログアウト
    </button>
  );
};

export default LogoutButton;