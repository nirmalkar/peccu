import { API_URL } from '@/constants/api';
import { FeedbackData } from '@/types/feedback';
export const uploadAudio = async (
  userId: number,
  file: Blob
): Promise<FeedbackData> => {
  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('file', file);
  const response = await fetch(`${API_URL}/pronunciation/upload/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload audio');
  }

  const data = await response.json();
  return data;
};
