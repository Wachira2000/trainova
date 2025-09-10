'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const PasswordInput = ({ name, id, value, onChange, required = false }: { name: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-zinc-400 cursor-pointer"
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};

export default function UpdatePasswordForm({ user }: { user: User }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess('Password updated successfully! Redirecting to login...');
        setTimeout(async () => {
          try {
            await supabase.auth.signOut();
            router.push('/login');
          } catch (signOutError) {
            console.error('Error signing out:', signOutError);
            // Even if sign out fails, redirect to login
            router.push('/login');
          }
        }, 2000); // Reduced timeout to 2 seconds for better UX
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      // ✅ Always set loading to false, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdatePassword} className="space-y-4">
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-zinc-300">New Password</label>
        <PasswordInput name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300">Confirm New Password</label>
        <PasswordInput name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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