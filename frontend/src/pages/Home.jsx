import React, { useState } from 'react';
import BookCard from '../components/BookCard';

const Home = ({ books, borrowedIds, onBorrow, onRead, onEdit, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const hiddenTitles = new Set(['to kill a mockingbird', 'abc']);

  const filteredBooks = books
    .filter((book) => {
      const normalizedTitle = (book.title || '').toLowerCase().trim();
      return !hiddenTitles.has(normalizedTitle);
    })
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-600 font-bold">Book Share Community</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-black text-slate-900">Discover books, borrow safely, and keep reading.</h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600">Browse community books, borrow titles that interest you, and keep your personal shelf up to date.</p>
      </div>

      <div className="flex justify-center mb-12">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full max-w-2xl rounded-full border border-slate-200 bg-white px-5 py-4 shadow-sm outline-none focus:border-sky-400"
        />
      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 text-center">
        Borrow a book to open its PDF in <span className="font-semibold text-slate-900">My Books</span>. PDFs cannot be opened directly from the Home page.
      </div>

      {loading ? (
        <div className="text-center py-24 text-slate-500">Loading books...</div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onBorrow={onBorrow}
              onRead={onRead}
              onEdit={onEdit}
              isBorrowed={borrowedIds.has(book._id)}
              disableRead
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-500">No books match your search.</div>
      )}
    </div>
  );
};

export default Home;
