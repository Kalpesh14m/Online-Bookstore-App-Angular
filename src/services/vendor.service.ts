import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private addBookApi = 'sellers/addBook/';
  private updateBookApi = 'sellers/updateBook';
  private deleteBookApi = 'sellers/removeBook/';
  private displayBookApi = 'sellers/displayBooks/';
  private uploadBookProfileApi = 'users/uploadImage';
  private approveBookApi = 'sellers/approvalSent/';

  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.http.post(environment.baseUrl + this.addBookApi, book, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }

  displayBooks(page): Observable<any> {
    return this.http.get(environment.baseUrl + this.displayBookApi, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      params: new HttpParams().set('pageNo',page)
    });
  }

  deleteBooks(bookId: any): Observable<any> {
    return this.http.delete(environment.baseUrl + this.deleteBookApi + bookId, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token')),
    });
  }
  uploadBookImage(file: FormData, isProfile: string): Observable<any> {
    return this.http.post(
      environment.baseUrl + this.uploadBookProfileApi,
      file,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
        params: new HttpParams().set('isProfile', isProfile),
      }
    );
  }
  updateBook(formGroup: FormGroup, bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.updateBookApi + '/' + bookId,
      formGroup,
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
  onApprove(bookId: any): Observable<any> {
    return this.http.put(
      environment.baseUrl + this.approveBookApi + bookId,
      '',
      {
        headers: new HttpHeaders().set('token', localStorage.getItem('token')),
      }
    );
  }
}
