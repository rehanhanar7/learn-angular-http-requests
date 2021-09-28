import { Component, OnDestroy } from '@angular/core';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { AppService, PostData } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  getDataSubscription: Subscription = null;

  constructor(private appService: AppService) {}

  postData: PostData = {
    name: 'Karthik',
    desc: 'Karthik is here',
  };

  postDataArray: PostData[];

  insertDataPost() {
    this.appService
      .insertData(this.postData)
      .pipe(
        catchError((err) => {
          console.log('I will be logged in analysis', err);
          return throwError(err);
        })
      )
      .subscribe(
        (res) => console.log('Response', res),
        (err) => console.log('Error', err)
      );
  }

  deleteData() {
    this.appService.deleteData().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  ngOnDestroy() {
    this.getDataSubscription.unsubscribe();
  }

  getData() {
    this.getDataSubscription = this.appService
      .fetchData()
      .pipe(
        map((res) => {
          let newarray: PostData[] = [];
          for (let key in res) {
            newarray.push({ ...res[key], id: key });
          }
          return newarray;
        })
      )
      .subscribe(
        (res) => {
          console.log('fetched response', res);
          this.postDataArray = res;
        },
        (err) => console.log('fetched error', err)
      );
  }
}

/**
 * What is Rest API ?
 * When we hit URL instead of HTML we get data from the url
 *
 * Anatomy of Http Requests
 * URL, Http Verbs, Headers (Meta data), Body (data to be transfered)
 *
 * Setup Firebase
 *
 * HttpClientModule
 *
 * Angular converts Object to JSON
 *
 * request works only when we subscribe to the request, Since angular will not call the request since no one is interest in the response
 *
 * Browser send two types of requests for post, one is OPTIONS (request type) to check the URL is valid
 * Second is the actual POST (request type) request
 *
 * Get Method to get the data
 *
 * Pipe method in subscribe ? - funnel the data through various rxjs operators before it meets the subscribe
 *
 * map operator to modify the request and returns observable
 *
 * set type of return data in http requests or in argument with POST model (interface)
 *
 * Display Data with Loader and Data not found conditions
 *
 * Delete Single Data & All Data
 *
 * Handling Error at subscribe end of component
 *
 * Handling Errpr using Subjects by Storing error as Subjects in Service and we subscribe that subjects in components, will be useful if we need to implement at multiple places
 *
 * Handling error using CatchError Operator, will be used to log the error for analytics purpose, catch error is return by throwError method in return statement of CatchError
 *
 * Dismiss error in using
 *
 * Setting headers in the Http requests
 *
 * Adding params in the request (HttpParams) we have to use set here. (we can also use url directly)
 * We can add multiple params as key value pairs (non object type) using append method in separate [new HttpParams()] variable
 *
 * query param differs from server to server, for example in firebase it returns response in more prettier way if we use a query param ('pretty':'print')
 *
 * observe property (observe : 'body' | 'response'), we can get more information about the response of the request
 *
 * tap operator does some operation on response data but does modify the data
 * HttpEventType enum in tap events
 *
 * Change Response Type, like observe : responseType : 'json' (default) | 'text'
 *
 * Interceptors to change request
 *
 * Interceptors to change the response
 *
 * Multiple Interceptors
 */
