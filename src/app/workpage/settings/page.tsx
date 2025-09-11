'use client';

import React from 'react';
import WorkpageLayout from '../../components/WorkpageLayout';
import { FiBell, FiZap } from 'react-icons/fi';

const SettingCard = ({ title, description, icon: Icon, children }: { title: string, description: string, icon: React.ElementType, children: React.ReactNode }) => (
  <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-6 flex items-start gap-6">
    <div className="bg-gray-800 p-3 rounded-full">
      <Icon className="w-6 h-6 text-green-400" />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-zinc-400 mb-4">{description}</p>
      {children}
    </div>
  </div>
);

const Toggle = ({ label, enabled, setEnabled }: { label: string, enabled: boolean, setEnabled: (enabled: boolean) => void }) => (
    <div className="flex items-center justify-between">
        <span className="text-white">{label}</span>
        <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors cursor-pointer ${enabled ? 'bg-green-500' : 'bg-gray-700'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


export default function SettingsPage() {
  const [notifications, setNotifications] = React.useState({ email: true, push: false });
  const [focusMode, setFocusMode] = React.useState(false);

  return (
    <WorkpageLayout>
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      <div className="space-y-8 max-w-4xl mx-auto">
        <SettingCard
          title="Notifications"
          description="Choose how you want to be notified about tasks and updates."
          icon={FiBell}
        >
          <div className="space-y-4">
            <Toggle label="Email Notifications" enabled={notifications.email} setEnabled={(val) => setNotifications(p => ({...p, email: val}))} />
            <Toggle label="Push Notifications" enabled={notifications.push} setEnabled={(val) => setNotifications(p => ({...p, push: val}))} />
          </div>
        </SettingCard>
        
        <SettingCard
          title="Focus Mode"
          description="Minimize distractions to concentrate on your tasks."
          icon={FiZap}
        >
          <Toggle label="Enable Focus Mode" enabled={focusMode} setEnabled={setFocusMode} />
          <p className="text-sm text-zinc-500 mt-2">When enabled, non-critical notifications will be paused.</p>
        </SettingCard>
      </div>
    </WorkpageLayout>
  );
}
