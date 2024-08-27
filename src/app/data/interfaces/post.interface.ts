import { Profile } from './profile.interface';

export interface PostCreateDto {
  title: string;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  user: Profile;
  images: string[];
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  user: {
    id: number;
    username: string;
    avatar_url: string;
    subscribers_amount: number;
  };
  post_id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
}

export interface CommentCreateDto {
  text: string;
  post_id: number;
}
