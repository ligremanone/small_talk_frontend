import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Comment, Post } from '../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../common ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';
import { SvgIconComponent } from '../../../common ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from './comment/comment/comment.component';
import { PostService } from '../../../data/services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarCircleComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<Comment[]>([]);
  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getAllComments(this.post()!.id),
    );
    // @ts-ignore
    this.comments.set(comments);
  }
}
