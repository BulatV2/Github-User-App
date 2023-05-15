const API_BASE_URL = "https://api.github.com";

export const getUser = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  const data = await response.json();
  return data;
};

export const getRepositories = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/repos`);
  const data = await response.json();
  return data;
};
