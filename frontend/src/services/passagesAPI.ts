import axios from 'axios';

import { API_URL } from '@/constants/api';

export const fetchPassages = async () => {
  try {
    const response = await axios.get(`${API_URL}/passage`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
