'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import PaymentDetailsForm from '../components/PaymentDetailsForm';

interface Profile {
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  bank_code?: string;
}

export default function PaymentsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('bank_name,account_number,account_name,bank_code')
          .eq('id', user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = (newProfile: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...newProfile });
    } else {
      setProfile(newProfile as Profile);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">You must be logged in to view this page.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment Details</h1>
        
        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Your Bank Account</h3>
          {profile && profile.bank_name ? (
            <div>
              <p><span className="font-semibold">Bank:</span> {profile.bank_name}</p>
              <p><span className="font-semibold">Account Number:</span> {profile.account_number}</p>
              <p><span className="font-semibold">Account Name:</span> {profile.account_name}</p>
            </div>
          ) : (
            <p className="text-zinc-400">You have not added your payment details yet.</p>
          )}
        </div>

        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8 mt-8">
          <h3 className="text-xl font-bold mb-4">Update Payment Details</h3>
          <PaymentDetailsForm user={user} profile={profile || {}} onUpdate={handleProfileUpdate} />
        </div>

      </div>
    </main>
  );
}