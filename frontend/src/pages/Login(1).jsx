import React, { useMemo, useState } from 'react';
import PasswordField from '../components/PasswordField';

const Profile = ({ user, onLogin, onRegister, onResetPassword, onUpdate, onLogout, status }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', photo: '', bio: '', photoFile: null });

  const canSubmit = useMemo(() => {
    if (mode === 'login' || mode === 'forgot') {
      return formData.email && formData.password;
    }
    return formData.name && formData.email && formData.password;
  }, [formData, mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (mode === 'login') {
      await onLogin({ email: formData.email, password: formData.password });
    } else if (mode === 'forgot') {
      await onResetPassword({ email: formData.email, password: formData.password });
      setMode('login');
    } else {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('password', formData.password);
      payload.append('photo', formData.photo);
      payload.append('bio', formData.bio);
      if (formData.photoFile) payload.append('photoFile', formData.photoFile);
      await onRegister(payload);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append('name', formData.name || user.name);
    payload.append('email', formData.email || user.email);
    payload.append('photo', formData.photo || user.photo);
    payload.append('bio', formData.bio || user.bio);
    if (formData.password) payload.append('password', formData.password);
    if (formData.photoFile) payload.append('photoFile', formData.photoFile);
    await onUpdate(payload);
    setFormData({ name: '', email: '', password: '', photo: '', bio: '', photoFile: null });
  };

  return (
    <div className="px-6 py-12 min-h-[80vh] bg-slate-50">
      <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-6">
          <div className="rounded-[40px] bg-white p-10 shadow-lg border border-slate-200">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-semibold">Profile</p>
              <h1 className="text-3xl font-black text-slate-900">{user ? 'Welcome back!' : 'Join the book community'}</h1>
              <p className="text-slate-600 leading-7">{user ? 'Update your profile and manage your borrowed books from this page.' : 'Use the same page to log in or register so you can borrow books instantly.'}</p>
            </div>
          </div>

          {user ? (
            <div className="rounded-[40px] bg-white p-10 shadow-lg border border-slate-200">
              <div className="flex flex-col items-center gap-4 text-center">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={`${user.name} profile`}
                    className="w-28 h-28 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-sky-600 text-white text-4xl font-black flex items-center justify-center">{user.name?.charAt(0).toUpperCase()}</div>
                )}
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
                  <p className="text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500 font-semibold">Profile details</h3>
                  <p className="mt-2 text-slate-600">Update your name, photo URL, bio, or password below.</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="grid gap-4">
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                  />
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                  />
                  <input
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    placeholder="Profile photo URL"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-slate-600"
                    onChange={(e) => setFormData({ ...formData, photoFile: e.target.files?.[0] || null })}
                  />
                  {formData.photoFile && (
                    <p className="text-xs text-slate-500 mt-2">Selected profile image: {formData.photoFile.name}</p>
                  )}
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Bio"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none min-h-[140px] resize-none"
                  />
                  <PasswordField
                    id="profile-password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="New password"
                    className="w-full"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-3xl bg-sky-600 text-white py-4 font-bold hover:bg-sky-700 transition"
                  >
                    Save profile changes
                  </button>
                </form>

                <button
                  onClick={onLogout}
                  className="w-full rounded-3xl border border-slate-200 bg-white text-slate-700 py-4 font-semibold hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[40px] bg-white p-10 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between gap-4 mb-8">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${mode === 'login' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 rounded-full py-3 text-sm font-semibold transition ${mode === 'register' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                {mode === 'register' && (
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                  />
                )}
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                />
                <PasswordField
                  id="auth-password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={mode === 'forgot' ? 'New password' : 'Password'}
                  required
                  className="w-full"
                />
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-left text-sm text-sky-600 hover:text-sky-700"
                  >
                    Forgot password?
                  </button>
                )}
                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-left text-sm text-slate-500 hover:text-slate-700"
                  >
                    Back to login
                  </button>
                )}
                {mode === 'register' && (
                  <>
                    <input
                      value={formData.photo}
                      onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                      placeholder="Profile photo URL"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-sm text-slate-600"
                      onChange={(e) => setFormData({ ...formData, photoFile: e.target.files?.[0] || null })}
                    />
                    {formData.photoFile && (
                      <p className="text-xs text-slate-500 mt-2">Selected profile image: {formData.photoFile.name}</p>
                    )}
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Short bio"
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 outline-none min-h-[120px] resize-none"
                    />
                  </>
                )}

                {status.error && <p className="text-sm text-rose-600">{status.error}</p>}
                {status.success && <p className="text-sm text-emerald-600">{status.success}</p>}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full rounded-3xl bg-sky-600 text-white py-4 font-bold hover:bg-sky-700 transition disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {mode === 'login' ? 'Login' : mode === 'forgot' ? 'Reset password' : 'Create account'}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="rounded-[40px] bg-white p-10 shadow-lg border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900">Profile tips</h2>
          <ul className="mt-4 space-y-3 text-slate-600 leading-7">
            <li>Use one page to log in or create your profile.</li>
            <li>Borrow books from Home and manage them in My Books.</li>
            <li>Update your photo, bio, or password anytime.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
