import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { MatDialog } from '@angular/material';
import { ReviewComponent } from '../review/review.component';
import {AdminService} from 'src/services/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import {BookReviewComponent} from '../book-review/book-review.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  btnName="Review";
  bookrating:any;
  username = localStorage.getItem('name');
  usermail = localStorage.getItem('email');
  profile = localStorage.getItem('image');
  orderedbooks:[];
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private Adminservice: AdminService,
              private router: Router)
  { 
      this.userService.getmyOrders().subscribe((response:any)=>{
          console.log("orders:",response);
          this.orderedbooks=response.data;
      });
      this.router.routeReuseStrategy.shouldReuseRoute = () =>{ return false;}
  }
  openDialog(book) {

    console.log("book=",book);
    console.log("book id:",book.book.bookId);
    localStorage.setItem('orderid',book.myOrderId);
    localStorage.setItem('bookId',book.book.bookId);
    let dialogRef=this.dialog.open(BookReviewComponent, {width: '30%'});
    dialogRef.afterClosed().subscribe(result=>{
      this.router.navigate(['/myorders']);
      this.router.navigate(['/myorders']);
    });
    //this.btnName="4.5";
  }
  ngOnInit() {
  }
  Logout() {
    console.log('CAME TO LOGOUT');
    this.Adminservice.logout().subscribe();
    localStorage.clear();
    console.log(localStorage.length);
    this.router.navigate(['/dashboard']);
  }
  openDialogztoedit() {
    this.dialog.open(EditProfileComponent);
  }
}
