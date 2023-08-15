import { Component, OnInit } from '@angular/core';
import { PostsDataService } from 'src/app/data/posts-data.service';
import { tap, switchMap } from 'rxjs';
import { IPost } from '../interfaces/IPost';
import { IUser } from '../interfaces/IUser';
import { IComment } from '../interfaces/IComment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  public currentPost: IPost;
  public currentUser: IUser;
  public currentComments: IComment[];
  public postId: number;

  constructor(
    private postsDataService: PostsDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  public getId() {
    this.activatedRoute.params.subscribe((param) => {
      this.postId = param['id'];
    });
  }

  public fetchData() {
    this.getId();
    this.postsDataService
      .fetchSinglePost(this.postId)
      .pipe(
        tap((response) => {
          this.currentPost = response;
        }),
        switchMap(() => this.getUsers()),
        switchMap(() => this.getComments())
      )
      .subscribe();
  }

  public getUsers() {
    return this.postsDataService.fetchUsers().pipe(
      tap((userResponse?) => {
        this.currentUser = userResponse.filter(
          (user) => user.id === this.currentPost?.userId
        )[0];
      })
    );
  }

  public getComments() {
    return this.postsDataService.fetchComments().pipe(
      tap((commentsResponse) => {
        this.currentComments = commentsResponse.filter(
          (comment) => comment.postId === this.currentPost?.id
        );
      })
    );
  }
}
