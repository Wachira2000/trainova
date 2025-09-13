'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { FiCheck, FiX, FiLoader } from 'react-icons/fi';

interface WithdrawalRequest {
  id: number;
  user_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  }[] | null;
}

export default function AdminWithdrawalsPage() {
  const supabase = createSupabaseBrowserClient();
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchWithdrawalRequests();
  }, []);

  const fetchWithdrawalRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('withdrawal_requests')
      .select(`
        id,
        user_id,
        amount,
        status,
        created_at,
        profiles ( full_name, email )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else if (data) {
      setRequests(data as WithdrawalRequest[]);
    }
    setLoading(false);
  };

  const handleUpdateRequest = async (id: number, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('withdrawal_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      // If approved, we would trigger the actual payout here.
      // For now, we just update the status.

      setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading requests...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <main className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <h1 className="text-3xl font-bold mb-8">Withdrawal Requests</h1>
        <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">User</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Amount</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Date</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                      {request.profiles?.[0]?.full_name || request.profiles?.[0]?.email || request.user_id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">${request.amount.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        request.status === 'approved' ? 'bg-green-900 text-green-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-300">{new Date(request.created_at).toLocaleString()}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {request.status === 'pending' && (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleUpdateRequest(request.id, 'approved')}
                            disabled={updatingId === request.id}
                            className="text-green-400 hover:text-green-300 disabled:opacity-50"
                          >
                            {updatingId === request.id ? <FiLoader className="animate-spin" /> : <FiCheck />}
                          </button>
                          <button
                            onClick={() => handleUpdateRequest(request.id, 'rejected')}
                            disabled={updatingId === request.id}
                            className="text-red-400 hover:text-red-300 disabled:opacity-50"
                          >
                            {updatingId === request.id ? <FiLoader className="animate-spin" /> : <FiX />}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
