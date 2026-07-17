import React from 'react';

const BookDetails = ({ book, onBack }) => {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        ← Back to home
      </button>

      <div className="mt-8 rounded-[40px] bg-white p-10 shadow-lg border border-slate-200">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          <div className="rounded-[32px] bg-sky-100 p-8 flex items-center justify-center text-6xl">📖</div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">{book.title}</h1>
            <p className="mt-3 text-slate-500 text-lg">By {book.author}</p>
            <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-700">{book.summary || 'A delightful read from the bookshelf.'}</div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Status</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Available to borrow</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Description</p>
                <p className="mt-2 text-lg text-slate-700">A book-themed experience designed for a community library.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
