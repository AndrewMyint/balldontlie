const API_BASE_URL = 'https://www.balldontlie.io/api/v1';

export const fetchPlayers = async () => {
  const response = await fetch(`${API_BASE_URL}/players?limit=10`);
  const data = await response.json();
  return data;
};
