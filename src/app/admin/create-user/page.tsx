"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function CreateUserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/'); // Redirect non-admins
        }
      } else {
        router.push('/login'); // Redirect unauthenticated users
      }
      setAuthLoading(false);
    };

    checkUserRole();
  }, [router]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const response = await fetch('/api/auth/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('User created successfully!');
      setEmail('');
      setPassword('');
    } else {
      setError(data.error || 'An unknown error occurred.');
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <main>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-white">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-red-500">Access Denied. You must be an admin to view this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md border border-zinc-700">
          <h1 className="text-2xl font-bold text-center text-white">Create New User</h1>
          <form className="space-y-6" onSubmit={handleCreateUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                New User's Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Temporary Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}