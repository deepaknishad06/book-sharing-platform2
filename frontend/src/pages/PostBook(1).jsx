import React, { useState, useEffect } from 'react';

const PostBook = ({ onPost, setActiveTab, book, onCancel }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [summary, setSummary] = useState("");
  const [cover, setCover] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const isEditing = !!book;

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setGenre(book.genre || "");
      setSummary(book.summary || "");
      setCover(book.cover || "");
      setPdfUrl(book.pdfUrl || "");
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      alert("Please fill in at least Title and Author!");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('summary', summary);
    formData.append('cover', cover);
    formData.append('pdfUrl', pdfUrl);
    if (coverFile) formData.append('coverFile', coverFile);
    if (pdfFile) formData.append('pdfFile', pdfFile);

    try {
      if (isEditing) {
        await onPost(formData, book._id || book.id); // Pass ID for update
      } else {
        await onPost(formData);
      }

      setTitle("");
      setAuthor("");
      setGenre("");
      setSummary("");
      setCover("");
      setPdfUrl("");
      setCoverFile(null);
      setPdfFile(null);
      setActiveTab('Home');
    } catch (error) {
      console.error('Book save failed', error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setSummary("");
    setCover("");
    setPdfUrl("");
    setCoverFile(null);
    setPdfFile(null);
    if (onCancel) onCancel();
    setActiveTab('Home');
  };

  return (
    <div className="p-10 min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-[40px] shadow-xl border border-blue-50 w-full max-w-2xl transition-all">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-4">
            <span className="text-4xl">📖</span>
          </div>
          <h2 className="text-3xl font-black text-gray-800">{isEditing ? 'Edit Book' : 'Post a New Book'}</h2>
          <p className="text-gray-400 mt-2 font-medium">{isEditing ? 'Update your book details' : 'Share your book with the community'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Book Title *</label>
            <input 
              type="text" 
              placeholder="e.g. The Psychology of Money" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Author Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Morgan Housel" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Genre</label>
            <input 
              type="text" 
              placeholder="e.g. Finance, Self-help, Fiction" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Summary</label>
            <textarea 
              placeholder="Brief description of the book..." 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 resize-none"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Cover Image URL</label>
            <input 
              type="url" 
              placeholder="e.g. https://example.com/cover.jpg (optional)" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">Or upload a cover file below if you have one on your device.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Upload cover image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-slate-600"
              onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
            />
            {coverFile && <p className="text-xs text-slate-500 mt-2">Selected: {coverFile.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">PDF URL</label>
            <input 
              type="url" 
              placeholder="e.g. /pdfs/book-file.pdf or https://example.com/book.pdf" 
              className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-2">Or upload a PDF file below to attach it from your device.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Upload PDF file</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full text-sm text-slate-600"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            />
            {pdfFile && <p className="text-xs text-slate-500 mt-2">Selected: {pdfFile.name}</p>}
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all"
            >
              {isEditing ? 'Update Book' : 'Post Now'}
            </button>
            <button 
              type="button"
              onClick={handleCancel}
              className="w-full mt-4 text-gray-400 font-bold hover:text-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBook;