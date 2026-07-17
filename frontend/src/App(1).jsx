import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBook from './pages/MyBook';
import Profile from './pages/Login';
import PostBook from './pages/PostBook';
import BookModal from './components/BookModal';
import NotFound from './pages/NotFound';
import { apiRequest, clearToken, getToken, setToken } from './utils/api';

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const [editingBook, setEditingBook] = useState(null);

  const isLoggedIn = Boolean(user);
  const borrowedIds = useMemo(
    () => new Set(borrowedBooks.map((book) => book._id)),
    [borrowedBooks]
  );

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadCurrentUser();
      loadMyBooks();
    }
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      const data = await apiRequest('/books');
      // Remove duplicates by title
      const uniqueBooks = data.filter((book, index, self) =>
        index === self.findIndex(b => b.title === book.title)
      );
      setBooks(uniqueBooks);
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const loadCurrentUser = async () => {
    try {
      const data = await apiRequest('/auth/me');
      setUser(data.user);
    } catch (error) {
      clearSession();
    }
  };

  const loadMyBooks = async () => {
    try {
      const data = await apiRequest('/mybooks');
      // Remove duplicates by title
      const uniqueBorrowed = data.filter((book, index, self) =>
        index === self.findIndex(b => b.title === book.title)
      );
      setBorrowedBooks(uniqueBorrowed);
    } catch (error) {
      setBorrowedBooks([]);
    }
  };

  const handleRegister = async (payload) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: payload,
      });
      setUser(data.user);
      setToken(data.token);
      setActiveTab('Home');
      await loadMyBooks();
      setStatus({ loading: false, error: '', success: 'Welcome to your profile!' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handleLogin = async (payload) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setUser(data.user);
      setToken(data.token);
      setActiveTab('Home');
      await loadMyBooks();
      setStatus({ loading: false, error: '', success: 'Successfully signed in.' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handleUpdateProfile = async (payload) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      const data = await apiRequest('/auth/me', {
        method: 'PUT',
        body: payload,
      });
      setUser(data.user);
      setStatus({ loading: false, error: '', success: 'Profile updated successfully.' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handleResetPassword = async ({ email, password }) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, newPassword: password }),
      });
      setStatus({ loading: false, error: '', success: 'If that email is registered, your password has been updated.' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const clearSession = () => {
    setUser(null);
    setBorrowedBooks([]);
    clearToken();
  };

  const handleLogout = () => {
    clearSession();
    setActiveTab('Home');
  };

  const handleBorrow = async (book) => {
    if (!isLoggedIn) {
      setActiveTab('Profile');
      setStatus({ loading: false, error: 'Please log in to borrow books.', success: '' });
      return;
    }

    try {
      setStatus({ loading: true, error: '', success: '' });
      await apiRequest(`/books/${book._id}/borrow`, { method: 'POST' });
      await loadMyBooks();
      setStatus({ loading: false, error: '', success: `${book.title} is now on your shelf.` });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handleRemove = async (bookId) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      await apiRequest(`/mybooks/${bookId}`, { method: 'DELETE' });
      await loadMyBooks();
      setStatus({ loading: false, error: '', success: 'Book removed from your shelf.' });
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const handleRead = (book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setActiveTab('Add Books');
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handlePost = async (payload, id) => {
    try {
      setStatus({ loading: true, error: '', success: '' });
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/books/${id}` : '/books';
      await apiRequest(url, {
        method,
        body: payload, // payload is FormData, not JSON
      });
      await loadBooks();
      setStatus({ loading: false, error: '', success: id ? 'Book updated successfully!' : 'Book posted successfully!' });
      setEditingBook(null); // Reset editing state
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: '' });
    }
  };

  const activeRoutes = {
    Home: (
      <Home
        books={books}
        borrowedIds={borrowedIds}
        onBorrow={handleBorrow}
        onRead={handleRead}
        onEdit={handleEdit}
        loading={status.loading}
      />
    ),
    'My Books': (
      <MyBook
        borrowedBooks={borrowedBooks}
        onRead={handleRead}
        onRemove={handleRemove}
        isLoggedIn={isLoggedIn}
      />
    ),
    Profile: (
      <Profile
        user={user}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onResetPassword={handleResetPassword}
        onUpdate={handleUpdateProfile}
        onLogout={handleLogout}
        status={status}
      />
    ),
    'Add Books': (
      <PostBook
        onPost={handlePost}
        setActiveTab={setActiveTab}
        book={editingBook}
        onCancel={handleCancelEdit}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50 to-white text-slate-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />

      <main className="pb-14">
        {activeRoutes[activeTab] || activeRoutes['Home'] || <NotFound />}
      </main>

      {showBookModal && (
        <BookModal
          book={selectedBook}
          onClose={() => {
            setSelectedBook(null);
            setShowBookModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
