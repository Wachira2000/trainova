'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiUser, FiDollarSign, FiCheckCircle, FiClock, FiList, FiCoffee } from 'react-icons/fi';


// Mock data - we will replace this with Supabase data later
const mockTasks = [
  { id: 1, title: 'Review and tag 100 images', status: 'available', payout: 50.00 },
  { id: 2, title: 'Transcribe 30-minute audio file', status: 'pending', payout: 75.00 },
  { id: 3, title: 'Categorize customer feedback', status: 'approved', payout: 120.00 },
  { id: 4, title: 'Data entry for 200 records', status: 'completed', payout: 200.00 },
  { id: 5, title: 'Find contact information for 50 leads', status: 'available', payout: 40.00 },
];

const statusConfig = {
  available: { color: 'bg-green-500', icon: FiList },
  pending: { color: 'bg-yellow-500', icon: FiClock },
  approved: { color: 'bg-blue-500', icon: FiCheckCircle },
  completed: { color: 'bg-gray-500', icon: FiCheckCircle },
};

export default function Workpage() {
  // We'll add state for user, tasks, etc. later
  const [tasks, setTasks] = useState(mockTasks);
  const isAdmin = true; // Placeholder for role-based access

  const stats = {
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    approved: tasks.filter(t => t.status === 'approved').length,
    available: tasks.filter(t => t.status === 'available').length,
    earnings: tasks.filter(t => t.status === 'completed').reduce((acc, t) => acc + t.payout, 0),
  };

  return (
    <main className="bg-black min-h-screen text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        
        {/* Header */}
        <header className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-4">
            <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
              <FiDollarSign />
              <span>Withdraw</span>
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-lg font-semibold text-green-400">Total Earned</h3>
            <p className="text-4xl font-bold mt-2">${stats.earnings.toFixed(2)}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-400">Pending Withdrawals</h3>
            <p className="text-4xl font-bold mt-2">$0.00</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-zinc-400">Completed</h4>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Pending</h4>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Approved</h4>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-400">Available</h4>
              <p className="text-2xl font-bold">{stats.available}</p>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-xl font-bold mb-4">Tasks</h2>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map(task => {
                const Icon = statusConfig[task.status as keyof typeof statusConfig].icon;
                const color = statusConfig[task.status as keyof typeof statusConfig].color;
                return (
                  <motion.div 
                    key={task.id}
                    className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border border-zinc-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: task.id * 0.05 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-zinc-400 capitalize">{task.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">${task.payout.toFixed(2)}</p>
                      {task.status === 'available' && (
                        <button className="text-sm text-white hover:underline mt-1">Claim Task</button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <FiCoffee className="mx-auto text-5xl text-zinc-500 mb-4" />
                <h3 className="text-xl font-semibold">No tasks right now.</h3>
                <p className="text-zinc-400">Time for a coffee break!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
