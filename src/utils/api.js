const BASE_URL = 'https://forum-api.dicoding.dev/v1';

/* ================= TOKEN ================= */

function putAccessToken(token) {
  localStorage.setItem('token', token);
}

function getAccessToken() {
  return localStorage.getItem('token');
}

/* ================= USERS ================= */

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.user;
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return {
    token: json.data.token,
  };
}

async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  const json = await response.json();

  return json.data.users;
}

async function getOwnProfile() {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.user;
}

/* ================= THREAD ================= */

async function getThreads() {
  const token = getAccessToken();

  const response = await fetch(`${BASE_URL}/threads`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const json = await response.json();

  return json.data.threads;
}

async function getThreadDetail(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  const json = await response.json();

  return json.data.detailThread;
}

async function createThread({ title, body, category }) {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      title,
      body,
      category,
    }),
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.thread;
}

/* ================= COMMENTS ================= */

async function createComment({ threadId, content }) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ content }),
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.comment;
}

/* ================= THREAD VOTE ================= */

async function upVoteThread(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.vote;
}

async function downVoteThread(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.vote;
}

async function neutralVoteThread(threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data.vote;
}

/* ================= COMMENT VOTE ================= */

async function upVoteComment(threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

  const json = await response.json();

  return json.data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

  const json = await response.json();

  return json.data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );

  const json = await response.json();

  return json.data.vote;
}

/* ================= LEADERBOARD ================= */

async function getLeaderboard() {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  const json = await response.json();

  return json.data.leaderboards;
}

/* ================= EXPORT ================= */

const api = {
  register,
  login,
  getUsers,
  getOwnProfile,
  getThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboard,
  putAccessToken,
  getAccessToken,
};

export default api;
