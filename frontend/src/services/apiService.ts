import axios from 'axios';

import { API_URL } from '@/constants/api';
import { FeedbackData } from '@/types/feedback';

export const uploadAudio = async (
  userId: number,
  file: Blob
): Promise<FeedbackData> => {
  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('file', file);

  try {
    const response = await axios.post(
      `${API_URL}/pronunciation/upload/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Failed to upload audio: ${error.response.data}`);
    } else {
      throw new Error('Failed to upload audio');
    }
  }
};
