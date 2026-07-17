import React from 'react';

const Navbar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navLinks = [
    { name: 'Home', id: 'Home' },
    { name: 'My Books', id: 'My Books' },
    { name: 'Add Books', id: 'Add Books' },
    { name: 'Profile', id: 'Profile' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-lg px-6 py-4 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab('Home')}
          className="text-xl sm:text-2xl font-black text-sky-700 tracking-tight"
        >
          Book Sharing Platform
        </button>

        <div className="flex flex-wrap items-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`text-sm font-semibold transition ${
                activeTab === link.id ? 'text-sky-700 border-b-2 border-sky-700 pb-1' : 'text-slate-500 hover:text-sky-600'
              }`}
            >
              {link.name}
            </button>
          ))}

          {user ? (
            <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
              <span className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">{user.name?.charAt(0).toUpperCase()}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
