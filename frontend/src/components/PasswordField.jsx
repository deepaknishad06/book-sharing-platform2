import React, { useState } from 'react';

const PasswordField = ({ value, onChange, placeholder, required, name, id, className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative ${className || ''}`}>
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 pr-14 outline-none transition focus:border-sky-400"
      />
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute inset-y-0 right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.94 17.94C16.31 19.14 14.26 19.85 12 19.85C7.58 19.85 3.89 17.06 2 12C2.9 9.2 4.46 6.84 6.56 5.2M9.88 9.88C10.27 9.49 10.88 9.49 11.27 9.88C11.66 10.27 11.66 10.88 11.27 11.27C10.88 11.66 10.27 11.66 9.88 11.27C9.49 10.88 9.49 10.27 9.88 9.88ZM14.12 14.12C13.73 14.51 13.12 14.51 12.73 14.12C12.34 13.73 12.34 13.12 12.73 12.73C13.12 12.34 13.73 12.34 14.12 12.73C14.51 13.12 14.51 13.73 14.12 14.12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 1L23 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12C2.9 16.84 7.58 19.63 12 19.63C16.42 19.63 21.1 16.84 23 12C21.1 7.16 16.42 4.37 12 4.37C7.58 4.37 2.9 7.16 1 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.5 12 8.5C10.07 8.5 8.5 10.07 8.5 12C8.5 13.93 10.07 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordField;
