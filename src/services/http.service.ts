import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseUrl;
  constructor( private http: HttpClient) { }

  public POST(url: any, data: any, token: any) {
    return this.http.post(this.baseUrl + url, data, token);
  }
  public GET(url: any, token: any) {
    return this.http.get(this.baseUrl + url, token);
  }
  public PUT(url: any, data: any, token: any) {
    return this.http.put(this.baseUrl + url, data, token);
  }
  public DELETE(url: any, data: any, token: any) {
    return this.http.delete(this.baseUrl + url, token);
  }
}
