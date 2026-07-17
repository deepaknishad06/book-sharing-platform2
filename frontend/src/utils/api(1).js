export const apiRequest = async (path, options = {}) => {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    credentials: 'include',
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
};

export const setToken = (token) => {
  localStorage.setItem('bookshare_token', token);
};

export const getToken = () => {
  return localStorage.getItem('bookshare_token');
};

export const clearToken = () => {
  localStorage.removeItem('bookshare_token');
};
