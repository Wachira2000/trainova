'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

interface Profile {
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  bank_code?: string;
}

export default function PaymentDetailsForm({ user, profile, onUpdate }: { user: User; profile: Profile; onUpdate: (newProfile: Profile) => void }) {
  const [banks, setBanks] = useState<any[]>([]);
  const [selectedBank, setSelectedBank] = useState(profile.bank_code || '');
  const [accountNumber, setAccountNumber] = useState(profile.account_number || '');
  const [accountName, setAccountName] = useState(profile.account_name || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch('https://api.paystack.co/bank', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          },
        });
        const data = await response.json();
        if (data.status) {
          setBanks(data.data);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (selectedBank && accountNumber.length === 10) {
      const verifyAccount = async () => {
        setIsVerifying(true);
        setError('');
        try {
          const response = await fetch(`/api/payments/verify-account?account_number=${accountNumber}&bank_code=${selectedBank}`);
          const data = await response.json();
          if (data.status) {
            setAccountName(data.data.account_name);
          } else {
            setError(data.message);
            setAccountName('');
          }
        } catch (error) {
          setError('Failed to verify account.');
          setAccountName('');
        }
        setIsVerifying(false);
      };
      verifyAccount();
    }
  }, [selectedBank, accountNumber]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName) {
      setError('Please verify your account details before saving.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    const selectedBankData = banks.find(bank => bank.code === selectedBank);

    const { data, error } = await supabase
      .from('profiles')
      .update({
        bank_name: selectedBankData?.name,
        account_number: accountNumber,
        account_name: accountName,
        bank_code: selectedBank,
      })
      .eq('id', user.id)
      .select()
      .single();

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data) {
      setSuccess('Payment details updated successfully!');
      onUpdate(data);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label htmlFor="bank" className="block text-sm font-medium text-zinc-300">Bank</label>
        <select
          id="bank"
          name="bank"
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white"
        >
          <option value="" disabled>Select a bank</option>
          {banks.map(bank => (
            <option key={bank.id} value={bank.code}>{bank.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="accountNumber" className="block text-sm font-medium text-zinc-300">Account Number</label>
        <input
          id="accountNumber"
          name="accountNumber"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          maxLength={10}
          className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white"
        />
      </div>
      <div>
        <label htmlFor="accountName" className="block text-sm font-medium text-zinc-300">Account Name</label>
        <input
          id="accountName"
          name="accountName"
          type="text"
          value={accountName}
          readOnly
          className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md text-white"
        />
        {isVerifying && <p className="text-sm text-zinc-400">Verifying...</p>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}
      <div>
        <button
          type="submit"
          disabled={loading || isVerifying || !accountName}
          className="w-full bg-white text-black font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Payment Details'}
        </button>
      </div>
    </form>
  );
}