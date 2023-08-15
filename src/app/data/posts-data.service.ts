import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../posts/interfaces/IPost';
import { IUser } from '../posts/interfaces/IUser';
import { IComment } from '../posts/interfaces/IComment';

@Injectable({
  providedIn: 'root',
})
export class PostsDataService {

  constructor(private http: HttpClient) {}

  public fetchPosts(): Observable<IPost[]> {
   return this.http.get('https://jsonplaceholder.typicode.com/posts') as Observable<IPost[]>;
  }

  public fetchUsers(): Observable<IUser[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/users') as Observable<IUser[]>;
  }

  public fetchComments(): Observable<IComment[]> {
    return this.http.get('https://jsonplaceholder.typicode.com/comments') as Observable<IComment[]>;
  }

  public fetchSinglePost(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`) as Observable<IPost>;
  }
}
