'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export default function UpdatePasswordForm({ user }: { user: User }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    // First, verify the old password by trying to sign in with it.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: oldPassword,
    });

    if (signInError) {
      setError('Incorrect old password.');
      setLoading(false);
      return;
    }

    // If the old password was correct, update to the new password.
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <form onSubmit={handleUpdatePassword} className="space-y-4">
      <div>
        <label htmlFor="oldPassword" className="block text-sm font-medium text-zinc-300">Old Password</label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-zinc-300">New Password</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300">Confirm New Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </form>
  );
}