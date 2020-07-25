import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from 'src/services/dashboard.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserService } from 'src/services/user.service';
import { AdminService } from 'src/services/admin.service';
import { MessageService } from 'src/services/message.service';
import { CartServiceService } from 'src/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  subscription: Subscription;
  data: any;
  isProfile = 'true';
  searchBook: string;
  books: any;
  profile = './assets/images/user.png';
  login: boolean;
  username: string;
  usermail: string;
  updateStats: any;
  file: any;
  isCart: boolean;
  isSuccess: boolean;
  cartCounter: number;
  mySubscription: any;
  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private Adminservice: AdminService,
    private messageService: MessageService,

  ) {
    if (localStorage.getItem('token') === null) {
      this.login = false;
      this.profile = './assets/images/user.png';
    } else {
      this.login = true;
      this.username = localStorage.getItem('name');
      this.usermail = localStorage.getItem('email');
      if (localStorage.getItem('image') === 'null') {
        this.profile = './assets/images/user.png';
      } else {
        this.profile = localStorage.getItem('image');
      }
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.messageService.onCartCount();
    if (localStorage.getItem('cartSize') !== null && localStorage.getItem('token') === null) {
      this.cartCounter = Number(localStorage.getItem('cartSize'));
    } else if (localStorage.getItem('token') !== null ) {
      this.messageService.cartCountMessage.subscribe((data: any) => {
        this.cartCount(data);
      });
    }
    this.messageService.onGetAllBooks();
    this.messageService.cartBooks();
  }

  cartCount(data) {
    if (data.status === 200) {
      this.cartCounter = data.data;
    }
  }
  openDialogztoedit() {
    this.dialog.open(EditProfileComponent);
  }
  openDialog(): void {
    localStorage.setItem('popup', 'false');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '75%';
    this.dialog.open(LoginComponent, {
      panelClass: 'custom-modalbox',
    });
  }

  onKey(event: any) {
    this.messageService.searchUserBook(event);
    this.isCart = false;
  }

  onCart() {
    this.messageService.onCartRefresh();
  }
  onSuccess() {
    this.isSuccess = true;
    this.router.navigate(['/dashboard/successPage']);
  }
  onBookStore() {
    this.isCart = false;
    this.router.navigate(['/dashboard/getallbooks']);
  }
  onLogin() {
    this.router.navigate(['/login']);

  }
  onsignup() {
    this.router.navigate(['/register']);
  }
  Logout() {
    this.Adminservice.logout().subscribe();
    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }
  OnSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;
      this.userService
        .uploadProfie(formData, this.isProfile)
        .subscribe((result: any) => {
          if (result.status === 200) {
            localStorage.setItem('image', result.data);
            this.profile = result.data;
          }
        });
    }
  }
  AddToCart(count: number) {
    this.cartCounter = count;
  }
  myorders() {
    console.log('my orders');
    this.router.navigate(['/myorders']);
  }

  mywishlist() {
    this.router.navigate(['viewallWishList']);
  }
}
