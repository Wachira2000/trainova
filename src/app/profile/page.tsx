'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import UserProfileForm from '../components/UserProfileForm';

// Define the Profile type
interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
  job?: string;
  role?: string;
}

export default function ProfilePage() {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile({ ...profileData, email: user.email });
          if (profileData.role === 'admin') {
            setIsAdmin(true);
          }
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (newProfile: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...newProfile });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!user || !profile) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">You must be logged in to view this page.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <UserProfileForm user={user} profile={profile} onUpdate={handleProfileUpdate} isAdmin={isAdmin} />
          <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Update Password</h3>
            <UpdatePasswordForm user={user} />
          </div>
        </div>

      </div>
    </main>
  );
}
