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
// import ikagibookPdf from '../assets/ikigai-book.pdf';

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

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  const coverImage = getCoverImage(book);
  const rawPdfSrc = (book.pdfUrl || book.pdfFile || book.pdf || book.fileUrl || '').trim();
  const pdfSrc = rawPdfSrc
    ? rawPdfSrc.startsWith('http://') || rawPdfSrc.startsWith('https://')
      ? rawPdfSrc
      : `${window.location.origin}${rawPdfSrc.startsWith('/') ? '' : '/'}${rawPdfSrc}`
    : '';
  const pdfLabel = pdfSrc ? pdfSrc.split('/').pop() : 'No PDF available';

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 md:p-8 lg:p-10 h-full flex flex-col">
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 text-3xl font-bold transition"
              aria-label="Close reader"
            >
              ×
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.7fr] items-start">
            <div className="flex justify-center">
              <img
                src={coverImage}
                alt={`${book.title} cover`}
                className="w-full max-w-sm h-auto rounded-[32px] shadow-xl object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{book.title}</h1>
              <p className="mt-3 text-slate-500 text-lg">By {book.author}</p>
              {book.genre && <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{book.genre}</p>}
              <div className="mt-6 rounded-3xl bg-slate-50 p-6 text-slate-700 leading-relaxed">
                {book.summary || 'Open the PDF below to start reading this title directly in the modal.'}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Cover</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{book.title}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">PDF file</p>
                  <p className="mt-2 text-lg text-slate-700">{pdfLabel}</p>
                  {pdfSrc && (
                    <a
                      href={pdfSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                    >
                      Open PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex-1 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950">
            {pdfSrc ? (
              <object
                data={pdfSrc}
                type="application/pdf"
                className="w-full h-full min-h-[55vh]"
              >
                <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-300">
                  <p className="text-xl font-semibold text-slate-100">Your browser cannot display this PDF inline.</p>
                  <p className="mt-3 max-w-xl text-slate-300">Open it directly to continue reading.</p>
                  <a
                    href={pdfSrc}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    Open PDF in new tab
                  </a>
                </div>
              </object>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-300">
                <p className="text-xl font-semibold text-slate-100">PDF unavailable</p>
                <p className="mt-3 max-w-xl text-slate-300">This book does not currently include a readable PDF. Please check the book record or upload a matching PDF file.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;