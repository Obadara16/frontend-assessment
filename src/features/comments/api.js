import apiClient from '../../utils/axiosInterceptor';

const API_URL = 'comments';

export const createCommentApi = async (postId, commentData) => {
  try {
    const response = await apiClient.post(`${API_URL}/create/${postId}`, commentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCommentsApi = async (postId) => {
  try {
    const response = await apiClient.get(`${API_URL}/get/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCommentApi = async (commentId, commentData) => {
  try {
    const response = await apiClient.put(`${API_URL}/update/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCommentApi = async (commentId) => {
  try {
    await apiClient.delete(`${API_URL}/delete/${commentId}`);
  } catch (error) {
    throw error.response.data;
  }
};
