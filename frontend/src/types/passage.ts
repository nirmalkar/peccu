export interface Passage {
  title: string;
  content: string;
  length: 'short' | 'medium' | 'long' | 'very long';
  difficulty: 'easy' | 'medium' | 'hard';
  feedback_required: boolean;
  feedback_type: string;
  feedback_details: string;
  tags: string[];
  author_id: number;
  id: number;
  created_at: string;
  user_id: number | null;
}
export interface PassagesState {
  passages: Passage[] | null;
  loading: boolean;
  error: string | null;
}
