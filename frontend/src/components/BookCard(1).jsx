import React from 'react';
import midnightLibraryCover from '../assets/midnight-library-cover.svg';
import alchemistCover from '../assets/alchemist-cover.svg';
import greatGatsbyCover from '../assets/great-gatsby-cover.svg';
import quietCover from '../assets/quiet-cover.svg';
import sapiensCover from '../assets/sapiens-cover.svg';
import atomicHabitsCover from '../assets/atomic-habits-cover.svg';
import toKillAMockingbirdCover from '../assets/to-kill-a-mockingbird-cover.svg';
import nineteenEightyFourCover from '../assets/1984-cover.svg';
import prideAndPrejudiceCover from '../assets/pride-and-prejudice-cover.svg';
import harryPotterCover from '../assets/harry-potter-cover.svg';
import richDadPoorDadCover from '../assets/rich-dad-poor-dad-cover.svg';
import thePowerOfHabitCover from '../assets/the-power-of-habit-cover.svg';
import ikigaiCover from '../assets/ikigai-cover.svg';
import thePsychologyOfMoneyCover from '../assets/the-psychology-of-money-cover.svg';
import thinkAndGrowRichCover from '../assets/think-and-grow-rich-cover.svg';

const coverMap = {
  'the midnight library': midnightLibraryCover,
  'the alchemist': alchemistCover,
  'the great gatsby': greatGatsbyCover,
  'quiet: the power of introverts': quietCover,
  'sapiens: a brief history of humankind': sapiensCover,
  'atomic habits': atomicHabitsCover,
  'to kill a mockingbird': toKillAMockingbirdCover,
  '1984': nineteenEightyFourCover,
  'pride and prejudice': prideAndPrejudiceCover,
  'harry potter and the philosopher’s stone': harryPotterCover,
  'rich dad poor dad': richDadPoorDadCover,
  'the power of habit': thePowerOfHabitCover,
  'ikigai': ikigaiCover,
  'the psychology of money': thePsychologyOfMoneyCover,
  'think and grow rich': thinkAndGrowRichCover,
};

const getCoverImage = (book) => {
  const title = (book.title || '').toLowerCase().trim();
  if (coverMap[title]) return coverMap[title];
  if (title.includes('midnight library')) return midnightLibraryCover;
  if (title.includes('alchemist')) return alchemistCover;
  if (title.includes('gatsby')) return greatGatsbyCover;
  if (title.includes('quiet')) return quietCover;
  if (title.includes('sapiens')) return sapiensCover;
  if (title.includes('atomic habits')) return atomicHabitsCover;
  if (title.includes('to kill a mockingbird')) return toKillAMockingbirdCover;
  if (title.includes('1984')) return nineteenEightyFourCover;
  if (title.includes('pride and prejudice')) return prideAndPrejudiceCover;
  if (title.includes('harry potter')) return harryPotterCover;
  if (title.includes('rich dad poor dad')) return richDadPoorDadCover;
  if (title.includes('the power of habit')) return thePowerOfHabitCover;
  if (title.includes('ikigai')) return ikigaiCover;
  if (title.includes('the psychology of money')) return thePsychologyOfMoneyCover;
  if (title.includes('think and grow rich')) return thinkAndGrowRichCover;
  if (book.cover) return book.cover;
  return midnightLibraryCover;
};

const BookCard = ({ book, onDelete, onBorrow, onRead, isBorrowed = false, disableRead = false, onEdit }) => {
  const coverImage = getCoverImage(book);
  const bookId = book._id || book.id;
  const showDelete = typeof onDelete === 'function';
  const showBorrow = typeof onBorrow === 'function';
  const borrowDisabled = showBorrow && isBorrowed;
  const label = borrowDisabled ? 'Already borrowed' : 'Borrow';
  const genreText = book.genre || book.category;
  const pdfAvailable = Boolean(book.pdfUrl || book.pdf || book.fileUrl || book.pdfFile);
  const readLabel = disableRead ? 'Go to My Books' : 'Read';
  const readDisabled = disableRead;

  const showEdit = typeof onEdit === 'function';

  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col group overflow-hidden transition hover:-translate-y-0.5">
      {(showDelete || showEdit) && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          {showEdit && (
            <button
              onClick={() => onEdit(book)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="Edit this book"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {showDelete && (
            <button
              onClick={() => onDelete(bookId)}
              className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              title="Delete this book"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="relative overflow-hidden rounded-[32px] mb-5 shadow-inner">
        <img
          src={coverImage}
          alt={`${book.title} cover`}
          className="w-full h-56 object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          {genreText && <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">{genreText}</p>}
          <h3 className="text-xl font-black text-slate-900 leading-tight">{book.title}</h3>
          <p className="text-sm text-slate-500 mb-4">By {book.author}</p>
          {book.summary && <p className="text-sm text-slate-600 leading-6 max-h-16 overflow-hidden">{book.summary}</p>}
          {disableRead && pdfAvailable && (
            <p className="mt-4 text-sm text-slate-500">Borrow this book to open the PDF from My Books.</p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {showBorrow && (
            <button
              onClick={() => onBorrow(book)}
              disabled={borrowDisabled}
              className={`flex-1 rounded-2xl py-3 text-sm font-bold transition ${borrowDisabled ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
            >
              {label}
            </button>
          )}

          <button
            onClick={() => !readDisabled && onRead(book)}
            disabled={readDisabled}
            className={`flex-1 rounded-2xl py-3 text-sm font-bold border border-slate-200 bg-white text-sky-600 transition ${readDisabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : 'hover:bg-slate-50'}`}
          >
            {readLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
