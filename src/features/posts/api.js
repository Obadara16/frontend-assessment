import apiClient from "../../utils/axiosInterceptor";

const API_URL = 'posts';

export const fetchPostsApi = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchPostApi = async (postId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addPostApi = async (postData) => {
  try {
    const response = await apiClient.post(`${API_URL}/create`, postData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing post
export const updatePostApi = async (postData) => {
  try {
    const { id, ...data } = postData;
    const response = await apiClient.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deletePostApi = async (id) => {
  try {
    const response = await apiClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
