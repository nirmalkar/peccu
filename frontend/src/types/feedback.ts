type FeedbackScores = {
  [key: string]: number;
};

export interface FeedbackData {
  audio_file: Blob;
  user_id: number;
  scores: FeedbackScores;
  id: number;
  feedback: string;
}
