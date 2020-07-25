import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpService) { }

  public search(searchBook: string): Observable<any> {
    const token = '';
    return this.http.GET('books/bookStoreApplication/getBookByAuthorName?authorName=' + searchBook, token);
  }
}
