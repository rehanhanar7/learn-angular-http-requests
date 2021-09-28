import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

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
  private url =
    'https://stackblitz-angular-rest-default-rtdb.firebaseio.com/posts.json';
  /**
   * Insert Data using post
   */
  insertData(postdata: PostData) {
    return this.httpClient.post(this.url, postdata);
  }

  /**
   * Fetch Data using get
   */
  fetchData() {
    return this.httpClient.get<PostData>(this.url, {
      /**
       * Setting headers and params
       */
      headers: new HttpHeaders({
        myname: 'Rehan',
      }),
      params: new HttpParams().append('pretty', 'print'),
    });
  }

  /**
   * Delete Data using delete
   */
  deleteData() {
    return this.httpClient.delete(this.url);
  }
}
