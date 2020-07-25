import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { ResetPassword } from 'src/models/reset-password.model';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
private orderCheckoutApi = 'orders/checkOut'

  constructor(private http: HttpService) {}
  public register(user: any): Observable<any> {
    console.log(user);
    return this.http.POST('users/register', user, '');
  }

  forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.PUT('users/forgotpassword', params, '');
  }

  resetPassword(data: any, token: string): Observable<any> {
    console.log('IN USER SERVICE');
    console.log(data);
    console.log(token);
    // const params=new HttpParams().set('token',token);
    return this.http.PUT('users/resetpassword?token=' + token, data, '');
  }

  verification(authorization: string) {
    const token = '';
    return this.http.GET('user/verify' + authorization, token);
  }

  public login(login: any): Observable<any> {
    return this.http.POST('users/login', login, '');
  }
  uploadProfie(file:FormData,isProfile:any)
  {
    console.log("IN USERSERVICE TO UPLOAD IMAGE:",file);
    return this.http.POST('users/uploadImage',file,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')),params: new HttpParams().set('isProfile', isProfile) });
  }
  updateUser(data)
  {
    console.log("in update user service:",data);
    return this.http.PUT('users/update',data,{ params:new HttpParams().set('token',localStorage.getItem('token'))});
  }
  onCheckOut(): Observable<any>  {
    return this.http.POST(this.orderCheckoutApi, '', {
       headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }
  // checkout(bookId,quantity)
  // {
  //   console.log("in user service for checkout",bookId,quantity);
  //   return this.http.POST('orders/checkout/'+bookId+'/'+quantity,'',{ params:new HttpParams().set('token',localStorage.getItem('token'))});
  // }
  checkout(bookSum) {
    // console.log("in user service for checkout",bookId,quantity);
    console.log('books', bookSum);
    return this.http.POST('orders/checkout/', { params: new HttpParams().set('books', bookSum)}, { params: new HttpParams().set('token', localStorage.getItem('token'))});
  }
  getmyOrders():Observable<any>
  {
    return this.http.GET('orders/myorders',{ headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  }
  Address(data)
  {
    console.log("address in user service:",data);
    return this.http.POST('address/addAddress',data,{ headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  }
  getAddress(addresstype)
  {
    return this.http.GET('address/getAddressByType',{params: new HttpParams().set('addressType', addresstype),headers: new HttpHeaders().set('token', localStorage.getItem('token'))});
  }
  verifyUser(token:string)
  {
    return this.http.GET('users/verify',{params:new HttpParams().set('token',token)});
  }
}
