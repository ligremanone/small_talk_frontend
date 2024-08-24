import { Profile } from './profile.interface';

export interface PostCreateDto {
  title: string;
  content: string;
  author_id: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatar_url: string;
    subscribers_amount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}
