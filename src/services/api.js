const API_ROOT = 'https://realworld.habsida.net/api';

export const register = async (user) => {
  const res = await fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  });
  return res.json();
};

export const fetchArticle = async (slug) => {
  const res = await fetch(`https://realworld.habsida.net/api/articles/${slug}`);
  return res.json();
};

export const login = async (user) => {
  const res = await fetch(`${API_ROOT}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  });
  return res.json();
};

export const updateUser = async (user, token) => {
  const res = await fetch(`${API_ROOT}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user }),
  });
  return res.json();
};

export const fetchArticles = async (page = 0, limit = 10) => {
  const offset = page * limit;
  const res = await fetch(`https://realworld.habsida.net/api/articles?offset=${offset}&limit=${limit}`);
  return res.json();
};
