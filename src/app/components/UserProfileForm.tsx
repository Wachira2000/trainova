'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { FiUpload, FiEdit, FiSave, FiX } from 'react-icons/fi';

interface Profile {
  full_name: string;
  avatar_url?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
  job?: string;
}

export default function UserProfileForm({ user, profile: initialProfile, onUpdate, isAdmin }: { user: User; profile: Profile; onUpdate: (newProfile: Partial<Profile>) => void; isAdmin: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialProfile.avatar_url || null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setAvatarFile(null);
    setAvatarPreview(profile.avatar_url || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let avatarUrl = profile.avatar_url;

      if (avatarFile) {
        const filePath = `${user.id}/avatar`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
        avatarUrl = publicUrl;
      }

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          phone_number: profile.phone_number,
          address: profile.address,
          city: profile.city,
          country: profile.country,
          avatar_url: avatarUrl,
          job: profile.job,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (updateError) throw updateError;

      if (data) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(''), 10000);
        onUpdate(data);
        setProfile(data);
        setAvatarFile(null);
        setIsEditing(false);
        localStorage.setItem('profile_updated', 'true');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setAvatarFile(null);
    setAvatarPreview(initialProfile.avatar_url || null);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Personal Information</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-zinc-700 cursor-pointer">
            <FiEdit />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex gap-4">
            <button onClick={handleCancel} className="flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 border border-zinc-700 cursor-pointer">
              <FiX />
              <span>Cancel</span>
            </button>
            <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 text-black font-semibold py-2 px-4 rounded-lg bg-white hover:bg-gray-200 disabled:opacity-50 cursor-pointer">
              <FiSave />
              <span>{loading ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Avatar Display/Upload */}
      <div className="flex items-center mb-6">
        <img 
          src={avatarPreview || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`}
          alt="Profile"
          className="w-24 h-24 rounded-full bg-gray-700 mr-8 object-cover"
        />
        {isEditing && (
          <div className="flex items-center gap-2">
            <label htmlFor="avatar-upload" className="bg-gray-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-white hover:bg-gray-600 cursor-pointer">
              <FiUpload className="inline-block mr-2" />
              <span>{avatarFile ? avatarFile.name : 'Upload New Photo'}</span>
              <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleFileChange} />
            </label>
            {avatarFile && (
              <button onClick={handleCancelUpload} className="text-red-500 hover:text-red-400 cursor-pointer">
                <FiX />
              </button>
            )}
          </div>
        )}
      </div>

      {/* User Info Display/Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-400">Full Name</label>
          <p className="mt-1 text-white">{profile.full_name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400">Email Address</label>
          <p className="mt-1 text-white">{profile.email}</p>
        </div>
        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-zinc-400">Phone Number</label>
          {isEditing ? (
            <input type="text" name="phone_number" id="phone_number" value={profile.phone_number || ''} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white" />
          ) : (
            <p className="mt-1 text-white">{profile.phone_number || 'Not provided'}</p>
          )}
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-zinc-400">Country</label>
          {isEditing ? (
            <input type="text" name="country" id="country" value={profile.country || ''} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white" />
          ) : (
            <p className="mt-1 text-white">{profile.country || 'Not provided'}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-zinc-400">Address</label>
          {isEditing ? (
            <input type="text" name="address" id="address" value={profile.address || ''} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white" />
          ) : (
            <p className="mt-1 text-white">{profile.address || 'Not provided'}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-zinc-400">City</label>
          {isEditing ? (
            <input type="text" name="city" id="city" value={profile.city || ''} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white" />
          ) : (
            <p className="mt-1 text-white">{profile.city || 'Not provided'}</p>
          )}
        </div>
        <div>
          <label htmlFor="job" className="block text-sm font-medium text-zinc-400">Job Category</label>
          {isEditing && isAdmin ? (
            <select
              id="job"
              name="job"
              value={profile.job || 'Generalist'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 bg-gray-800 border border-zinc-700 rounded-md text-white"
            >
              {[
                'Agriculture', 'Automotive & Robotics', 'Biology', 'Chemistry', 'Computer Vision', 
                'Cybersecurity', 'Design', 'Engineering & Built Environment', 'Environment', 'Ethics', 
                'Finance', 'Generative AI', 'Healthcare', 'History', 'Languages & Linguistics', 'Law', 
                'Legal', 'Lifestyle & Home', 'Marketing', 'Math', 'Music', 'Operations', 'Physics', 
                'Programing', 'Social Media', 'Support', 'Video & Multimedia', 'Writing', 'Generalist'
              ].sort().map(jobCategory => (
                <option key={jobCategory} value={jobCategory}>{jobCategory}</option>
              ))}
            </select>
          ) : (
            <p className="mt-1 text-white">{profile.job || 'Not provided'}</p>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
    </div>
  );
}
