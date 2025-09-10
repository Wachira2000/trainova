'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage('If an account with that email exists, a password reset link has been sent.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-md border border-zinc-800">
        <h1 className="text-2xl font-bold text-center text-white">Forgot Password</h1>
        <p className="text-center text-zinc-400">Enter your email and we'll send you a link to reset your password.</p>
        <form className="space-y-6" onSubmit={handlePasswordReset}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-500">{message}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-sm text-zinc-400 hover:text-white">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}