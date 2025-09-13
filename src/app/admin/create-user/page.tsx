'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { FiUpload } from 'react-icons/fi';

export default function CreateUserPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user');
  const [job, setJob] = useState('Generalist'); // Default job
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/'); // Redirect non-admins
        }
      } else {
        router.push('/login'); // Redirect unauthenticated users
      }
      setAuthLoading(false);
    };

    checkUserRole();
  }, [router]);

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

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      // 1. Get a signed URL
      const response = await fetch('/api/storage/signed-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const signedUrlData = await response.json();

      if (!response.ok) {
        console.error('Failed to get signed URL:', signedUrlData);
        throw new Error(signedUrlData.message || 'Failed to get signed URL');
      }

      const { signedUrl, path } = signedUrlData;

      // 2. Upload the file to the signed URL
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      // 3. Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
      
      return publicUrl;

    } catch (error) {
      console.error('Error uploading avatar:', error);
      setError((error as Error).message);
      return null;
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    let avatarUrl = '';
    if (avatarFile) {
      const uploadedUrl = await uploadAvatar(avatarFile);
      if (uploadedUrl) {
        avatarUrl = uploadedUrl;
      } else {
        setLoading(false);
        return; // Stop if upload failed
      }
    }

    const response = await fetch('/api/auth/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fullName, avatarUrl, role, job }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('User created successfully!');
      setEmail('');
      setPassword('');
      setFullName('');
      setAvatarFile(null);
      setAvatarPreview(null);
    } else {
      setError(data.error || 'An unknown error occurred.');
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <main>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-white">Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main>
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-red-500">Access Denied. You must be an admin to view this page.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8 pt-24">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-md border border-zinc-800">
          <h1 className="text-2xl font-bold text-center text-white">Create New User</h1>
          <form className="space-y-6" onSubmit={handleCreateUser}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                New User's Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                Temporary Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-zinc-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="job" className="block text-sm font-medium text-zinc-300">
                Job Category
              </label>
              <select
                id="job"
                name="job"
                required
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-zinc-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Avatar
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-700">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                  ) : (
                    <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.993A2 2 0 002 19h20a2 2 0 002-2.007zM12 13c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                    </svg>
                  )}
                </span>
                <label htmlFor="avatar-upload" className="ml-5 bg-gray-700 border border-zinc-600 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-white hover:bg-gray-600 cursor-pointer">
                  <FiUpload className="inline-block mr-2" />
                  <span>Upload Photo</span>
                  <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif, image/webp" onChange={handleFileChange} />
                </label>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}