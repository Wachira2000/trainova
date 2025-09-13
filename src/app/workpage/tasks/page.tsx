'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiInfo } from 'react-icons/fi';
import { useSupabase } from '../../components/SessionProvider';
import WorkpageLayout from '../../components/WorkpageLayout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { User } from '@supabase/supabase-js';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'available' | 'pending' | 'approved' | 'completed';
  payout: number;
  tags: string[];
}

export default function TasksPage() {
  const { supabase, user, profile } = useSupabase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (profile && user) {
        setLoading(true);
        setError(null);

        const { data: availableTasksData, error: availableTasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('status', 'available')
          .eq('category', profile.job);

        if (availableTasksError) {
          setError(availableTasksError.message);
        } else if (availableTasksData) {
          const tasksWithTags = availableTasksData.map(t => ({ ...t, tags: ['Data Annotation', 'Image Recognition']}))
          setTasks(tasksWithTags);
        }

        const { data: pendingTasksData, error: pendingTasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('status', 'pending')
          .eq('user_id', user.id);

        if (pendingTasksError) {
          setError(pendingTasksError.message);
        } else if (pendingTasksData) {
          setPendingTasks(pendingTasksData.map(t => ({ ...t, tags: ['Data Annotation', 'Image Recognition']})));
        }

        setLoading(false);
      } else if (profile) {
        // user has a profile but no job assigned
        setTasks([]);
        setPendingTasks([]);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [profile, supabase, user]);

  const handleClaimTask = async (taskId: number) => {
    if (!user) return;

    const taskToClaim = tasks.find(t => t.id === taskId);
    if (!taskToClaim) return;

    // Optimistically update the UI
    setTasks(tasks.filter(t => t.id !== taskId));
    setPendingTasks([...pendingTasks, { ...taskToClaim, status: 'pending' }]);
    setSelectedTask(null);

    const { error } = await supabase
      .from('tasks')
      .update({ status: 'pending', user_id: user.id })
      .eq('id', taskId);

    if (error) {
      // Revert the optimistic update on error
      setError(error.message);
      setTasks(tasks);
      setPendingTasks(pendingTasks);
    }
  };

  const handleMarkAsComplete = async (task: Task) => {
      if (!user) return;
  
      // Optimistically update the UI
      setPendingTasks(pendingTasks.filter(t => t.id !== task.id));
      setTasks(tasks.filter(t => t.id !== task.id));
  
      const { error } = await supabase
          .from('tasks')
          .update({ status: 'completed' })
          .eq('id', task.id);
  
      if (error) {
          setError(error.message);
          setPendingTasks(pendingTasks);
          setTasks(tasks);
      } else {
          // Update user_metrics
          const { data: metrics, error: metricsError } = await supabase
              .from('user_metrics')
              .select('*')
              .eq('user_id', user.id)
              .single();

          if (metrics) {
              const { error: updateError } = await supabase
                  .from('user_metrics')
                  .update({
                      completed_tasks: metrics.completed_tasks + 1,
                      total_earned: metrics.total_earned + task.payout,
                  })
                  .eq('user_id', user.id);
              if (updateError) {
                  setError(updateError.message);
              }
          }
      }
  };

  if (loading) {
    return (
      <WorkpageLayout>
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      </WorkpageLayout>
    );
  }

  if (error) {
    return (
      <WorkpageLayout>
        <div className="w-full h-full flex items-center justify-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </WorkpageLayout>
    );
  }

  return (
    <WorkpageLayout>
      <div className="flex gap-8 h-full">
        {/* Task List */}
        <div className="flex-1 flex flex-col">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-white">Available Tasks</h1>
            <p className="text-zinc-400">Claim a task to start working.</p>
          </header>
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedTask(task)}
                    className="bg-gray-900 p-4 rounded-lg border border-zinc-800 hover:border-cyan-500 cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-white">{task.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                {task.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-800 text-cyan-400 px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="font-bold text-green-400 text-lg">${task.payout.toFixed(2)}</p>
                            <p className="text-sm text-zinc-500">Payout</p>
                        </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FiCoffee className="mx-auto text-5xl text-zinc-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white">No tasks available for your job category right now.</h3>
                  <p className="text-zinc-400">Please check back later!</p>
                </div>
              )}
            </div>
          </div>

          <header className="mb-6 mt-8">
            <h1 className="text-3xl font-bold text-white">Your Pending Tasks</h1>
            <p className="text-zinc-400">Tasks you have claimed.</p>
          </header>
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="space-y-4">
              {pendingTasks.length > 0 ? (
                pendingTasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gray-900 p-4 rounded-lg border border-zinc-800"
                  >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-white">{task.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                {task.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-800 text-cyan-400 px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <button onClick={() => handleMarkAsComplete(task)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer">
                                Mark as Complete
                            </button>
                        </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FiCoffee className="mx-auto text-5xl text-zinc-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white">You have no pending tasks.</h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Details */}
        <aside className="w-1/3 bg-gray-900 rounded-2xl border border-zinc-800 p-6 flex flex-col">
          {selectedTask ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">{selectedTask.title}</h2>
              <p className="font-bold text-green-400 text-lg mb-4">${selectedTask.payout.toFixed(2)} Payout</p>
              
              <div className="flex-1 overflow-y-auto text-zinc-300 space-y-4">
                <p>{selectedTask.description || "No description available for this task."}</p>
              </div>

              <button onClick={() => handleClaimTask(selectedTask.id)} className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-pointer">
                Claim Task
              </button>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500">
              <FiInfo size={48} className="mb-4" />
              <h3 className="text-lg font-semibold text-white">Select a task</h3>
              <p>Choose a task from the list to see its details here.</p>
            </div>
          )}
        </aside>
      </div>
    </WorkpageLayout>
  );
}
