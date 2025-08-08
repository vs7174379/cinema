import React, { useEffect, useState } from 'react';
import { Edit, LogOut } from 'lucide-react';

const continueWatching = [
  {
    title: 'Stranger Things',
    image: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    progress: 40,
  },
  {
    title: 'Sacred Games',
    image: 'https://image.tmdb.org/t/p/w500/7HtvmsLtyC1iH6jlm9qvZ6e3uXl.jpg',
    progress: 70,
  },
  {
    title: 'Extraction',
    image: 'https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg',
    progress: 20,
  },
];

// ✅ Edit Profile Modal Component
const EditProfileModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    avatar: user.avatar || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + 'user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updated = await res.json();
        console.log('Updated user data:', updated.user); // Log the updated user data
        onSave(updated.user); // update user in parent
        onClose(); // close modal
      } else {
        // Handle error response
        console.error('Failed to update profile:', res.status, res.statusText);
        const errorData = await res.json();
        console.error('Error details:', errorData);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white p-6 rounded-lg w-full max-w-md relative border border-white/10 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Avatar URL</label>
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-zinc-800 border border-white/10 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + 'user/profile', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          console.error('Failed to fetch profile:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(import.meta.env.VITE_API_URL + 'user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/';
    } catch (err) {
      // Optionally handle error
    }
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading profile....
      </div>
    );
  }

  return (
    <div className="text-white px-6 py-10">
      <div className="glass max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 relative border border-white/10 shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gradient-to-tr from-black via-gray-900 to-gray-800">
          {/* Avatar */}
          <img
            src={user?.avatar || 'https://i.pravatar.cc/150?img=32'}
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
            alt="User"
          />

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  {user?.fullName || 'User'}
                </h2>
                <p className="text-md font-bold text-yellow-400 mt-1">
                  {user?.subscription?.plan || 'Free Plan'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex items-center gap-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm"
                  onClick={() => setShowEditModal(true)}
                >
                  <Edit size={16} /> Edit Profile
                </button>
                <button
                  className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>

            <p className="mt-3 text-gray-300 text-sm">
              Your subscription is valid until{' '}
              <span className="text-white">
                {user?.subscription?.validTill
                  ? new Date(user.subscription.validTill).toDateString()
                  : 'Not Available'}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Continue Watching Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Continue Watching</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueWatching.map((item, i) => (
              <div
                key={i}
                className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-md font-semibold mb-2">{item.title}</h4>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {item.progress}% watched
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default Profile;
