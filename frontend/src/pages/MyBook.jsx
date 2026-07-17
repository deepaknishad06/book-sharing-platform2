import React from 'react';
import BookCard from '../components/BookCard';

const MyBook = ({ borrowedBooks, onRead, onRemove, isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <div className="px-6 py-24 max-w-4xl mx-auto text-center rounded-[40px] border border-dashed border-slate-300 bg-white shadow-sm">
        <h2 className="text-3xl font-black text-slate-900">Your shelf is waiting.</h2>
        <p className="mt-4 text-slate-600">Log in on the Profile page to see books you've borrowed and manage your collection.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">My Books</h2>
        <p className="mt-2 text-slate-600">Only read and remove actions are available for borrowed books.</p>
      </div>

      {borrowedBooks.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border border-slate-200 text-slate-500">
          You haven't borrowed any books yet.
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {borrowedBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onRead={onRead}
              onDelete={() => onRemove(book._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBook;
