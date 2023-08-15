import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/data/posts-data.service';
import { tap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { IUser } from '../interfaces/IUser';
import { IComment } from '../interfaces/IComment';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  public posts: IPost[];
  public users: IUser[];
  public comments: IComment[];

  constructor(private postsDataService: PostsDataService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
    this.getComments();
  }

  public getPosts() {
    this.postsDataService
      .fetchPosts()
      .pipe(
        tap((postsResponse) => {
          this.posts = postsResponse;
        })
      )
      .subscribe();
  }

  public getUsers() {
    this.postsDataService
      .fetchUsers()
      .pipe(
        tap((userResponse) => {
          this.users = userResponse;
        })
      )
      .subscribe();
  }

  public getComments() {
    this.postsDataService
      .fetchComments()
      .pipe(
        tap((commentsResponse) => {
          this.comments = commentsResponse;
        })
      )
      .subscribe();
  }

  public commentsCount(id: number) {
    let postComments = [];
    if (this.comments) {
      postComments = this.comments.filter(comment => comment.postId === id);
    }
    return postComments.length;
  }
}
