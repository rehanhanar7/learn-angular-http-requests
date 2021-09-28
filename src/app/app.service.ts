import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PostData {
  name: string;
  desc: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Insert Data using post
   */
  insertData(postdata: PostData) {
    return this.httpClient.post(
      'https://stackblitz-angular-rest-default-rtdb.firebaseio.com/posts.json',
      postdata
    );
  }

  /**
   * Fetch Data using get
   */
  fetchData() {
    return this.httpClient.get<PostData>(
      'https://stackblitz-angular-rest-default-rtdb.firebaseio.com/posts.json'
    );
  }

  /**
   * Delete Data using delete
   */
  deleteData() {
    return this.httpClient.delete(
      'https://stackblitz-angular-rest-default-rtdb.firebaseio.com/posts.json/'
    );
  }
}
