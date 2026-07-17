import React from 'react';

const NotFound = () => (
  <div className="px-6 py-24 min-h-[70vh] flex items-center justify-center">
    <div className="text-center rounded-[40px] border border-slate-200 bg-white p-14 shadow-lg">
      <p className="text-7xl">📚</p>
      <h1 className="mt-6 text-4xl font-black text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">Looks like that page does not exist. Use the navbar to navigate back to Home or Profile.</p>
    </div>
  </div>
);

export default NotFound;
