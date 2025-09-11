'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiX } from 'react-icons/fi';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import WorkpageLayout from '../components/WorkpageLayout';
import LoadingSpinner from '../components/LoadingSpinner';

interface UserMetrics {
  total_earned: number;
  pending_withdrawal: number;
  completed_tasks: number;
  pending_tasks: number;
  approved_tasks: number;
  available_tasks: number;
}

export default function Workpage() {
  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    total_earned: 0,
    pending_withdrawal: 0,
    completed_tasks: 0,
    pending_tasks: 0,
    approved_tasks: 0,
    available_tasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserMetrics();
    }
  }, [user]);

  const fetchUserMetrics = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('user_metrics')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      setError(error.message);
    } else if (data) {
      setUserMetrics({
        total_earned: data.total_earned || 0,
        pending_withdrawal: data.pending_withdrawal || 0,
        completed_tasks: data.completed_tasks || 0,
        pending_tasks: data.pending_tasks || 0,
        approved_tasks: data.approved_tasks || 0,
        available_tasks: data.available_tasks || 0,
      });
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setWithdrawMessage({ type: 'error', text: 'Please enter a valid amount.' });
      return;
    }
    if (amount > userMetrics.total_earned) {
      setWithdrawMessage({ type: 'error', text: 'Withdrawal amount cannot exceed total earned.' });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('withdraw', {
        body: { amount },
      });

      if (error) throw error;

      setWithdrawMessage({ type: 'success', text: 'Withdrawal request submitted successfully.' });
      setShowWithdrawModal(false);
      fetchUserMetrics(); // Refresh metrics
    } catch (error: any) {
      setWithdrawMessage({ type: 'error', text: error.message || 'An error occurred.' });
    } finally {
      setWithdrawAmount('');
      setTimeout(() => setWithdrawMessage(null), 5000);
    }
  };

  if (loading) {
    return <WorkpageLayout><div className="flex items-center justify-center h-full"><LoadingSpinner size={40} /></div></WorkpageLayout>;
  }

  if (error) {
    return <WorkpageLayout><div className="flex items-center justify-center h-full">Error: {error}</div></WorkpageLayout>;
  }

  return (
    <WorkpageLayout>
      <div className="flex flex-col h-full">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Overview</h1>
            <p className="text-zinc-400">A summary of your earnings and activity.</p>
          </div>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
          >
            <FiDollarSign />
            <span>Withdraw</span>
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-lg font-semibold text-green-400">Total Earned</h3>
            <p className="text-4xl font-bold mt-2">${userMetrics.total_earned.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-400">Pending Withdrawals</h3>
            <p className="text-4xl font-bold mt-2">${userMetrics.pending_withdrawal.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-zinc-400">Completed</h4>
              <p className="text-2xl font-bold">{userMetrics.completed_tasks}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Pending</h4>
              <p className="text-2xl font-bold">{userMetrics.pending_tasks}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Approved</h4>
              <p className="text-2xl font-bold">{userMetrics.approved_tasks}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Available</h4>
              <p className="text-2xl font-bold">{userMetrics.available_tasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Withdraw Funds</h2>
              <button onClick={() => setShowWithdrawModal(false)} className="text-zinc-400 hover:text-white">
                <FiX size={24} />
              </button>
            </div>
            {withdrawMessage && (
              <div className={`p-4 mb-4 rounded-lg ${withdrawMessage.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                {withdrawMessage.text}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-zinc-400 mb-2">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-zinc-400" />
                </div>
                <input
                  type="number"
                  id="amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="bg-gray-800 border border-zinc-700 text-white rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                  placeholder="0.00"
                />
              </div>
              <p className="text-sm text-zinc-500 mt-2">
                Available to withdraw: ${userMetrics.total_earned.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleWithdraw}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}
    </WorkpageLayout>
  );
}
