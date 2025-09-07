"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setError('');
      // Here you would typically handle the actual login logic
      // For now, we'll just redirect to the homepage on successful validation
      router.push('/');
    } else {
      setError(data.error);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md border border-zinc-700">
          <h1 className="text-2xl font-bold text-center text-white">Login to Trainova</h1>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                Trainova Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 mt-1 bg-gray-700 border rounded-md shadow-sm text-white focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm ${
                  error ? 'border-red-500' : 'border-zinc-600'
                }`}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
