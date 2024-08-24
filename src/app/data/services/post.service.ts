import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostCreateDto } from '../interfaces/post.interface';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);
  baseUrl = 'http://127.0.0.1:8000/api/v1/';
  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      }),
    );
  }

  fetchPosts() {
    return this.#http
      .get<Post[]>(`${this.baseUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  constructor() {}
}