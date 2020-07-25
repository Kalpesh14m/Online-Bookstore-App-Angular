import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpService) { }

  addReview(review: any, rating: any): Observable<any> {
    return this.http.POST('review/' + localStorage.getItem('bookId')+'/'+localStorage.getItem('orderid'), {review, rating},
    { headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  }

  getReview(token: any): Observable<any> {
    return this.http.GET('review/' + localStorage.getItem('bookId'),
    {headers: new HttpHeaders().set('token', token )});
  }

  addReviewApp(review: any, rating: any, token: any): Observable<any> {
    return this.http.POST('reviewApp/', {review, rating},
    {headers: new HttpHeaders().set('token', token )});
  }
}
