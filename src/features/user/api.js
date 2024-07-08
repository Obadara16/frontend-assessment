import axios from 'axios';

const API_URL = 'https://postit-backend-0q2e.onrender.com/api/users';

export const getUserApi = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
