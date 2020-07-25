import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VendorService } from './vendor.service';
import { BookService } from './book.service';
import { CartServiceService } from './cart.service';
import { AdminService } from './admin.service';
import { DashboardService } from './dashboard.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  count: number;
  private messageSource = new BehaviorSubject(Response);
  currentMessage = this.messageSource.asObservable();
  private userMessageSource = new BehaviorSubject(Response);
  currentUserMessage = this.userMessageSource.asObservable();
  private cartSource = new BehaviorSubject(Response);
  cartMessage = this.cartSource.asObservable();
  private adminBookSource = new BehaviorSubject(Response);
  adminBook = this.adminBookSource.asObservable();
  private adminSellerSource = new BehaviorSubject(Response);
  adminSeller = this.adminSellerSource.asObservable();
  private quantitySource = new BehaviorSubject(Response);
  quantityMessage = this.quantitySource.asObservable();
  private cartCountSource = new BehaviorSubject(Response);
  cartCountMessage = this.cartCountSource.asObservable();
  private booksCountSource = new BehaviorSubject(Response);
  booksCountMessage = this.booksCountSource.asObservable();
  private pageNumSource = new BehaviorSubject(this.count);
  pageNumMessage = this.pageNumSource.asObservable();
  constructor(
    private vendorService: VendorService,
    private bookService: BookService,
    private cartService: CartServiceService,
    private adminService: AdminService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  changeMessage(page) {
    this.vendorService.displayBooks(page).subscribe((data) => {
      this.messageSource.next(data);
    });
  }
  searchBook(event) {
    this.bookService.searchBooks(event.target.value).subscribe((data) => {
      this.messageSource.next(data);
    });
  }

  searchUserBook(event) {
    this.dashboardService.search(event.target.value).subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }

  changeoptionMessage() {
    this.bookService.sortbookByPriceDesc().subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }

  changeoptionMessage1() {
    this.bookService.sortbookByPriceAsc().subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }

  cartBooks() {
    if (
      localStorage.getItem('token') === null &&
      localStorage.getItem('cart') != null
    ) {
      this.cartSource.next(JSON.parse(localStorage.getItem('cart')));
    } else {
      this.cartService.displayBooksInCart().subscribe((data: any) => {
        this.cartSource.next(data);
        this.count = data.data.totalBooksInCart;
      });
    }
  }
  adminBookMessage() {
    this.adminService.getAllBooksForVerification().subscribe((data: any) => {
      this.adminBookSource.next(data);
    });
  }
  adminSellerMessage() {
    this.adminService.getAllSellers().subscribe(
      (data: any) => {
        this.adminSellerSource.next(data);
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open(error.error.message, 'ok', { duration: 2000 });
      }
    );
  }

  onGetAllBooks() {
    this.bookService.getAllbooks().subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }
  onViewAllWishlist() {
    this.bookService.viewWishlist().subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }

  onRefresh() {
    this.route.navigate(['/dashboard']);
  }
  onCartRefresh() {
    this.route.navigate(['/dashboard/cart']);
  }

  onUpdateQuantity(event,cartBookId) {
    this.cartService.updateQuantity(event.target.value, cartBookId).subscribe((data) => {
      this.quantitySource.next(data);
    }, (error: any) => {
      this.quantitySource.next(error);
    });
  }

  onCartCount(){
    this.cartService.cartCount().subscribe(data => {
      this.cartCountSource.next(data);
    },(error: any) => {
      this.cartCountSource.next(error);
    });
  }

  onBooksCount(){
    this.bookService.booksCount().subscribe(data => {
      this.booksCountSource.next(data);
    });
  }
  
  sendByPage(pageIndex) {
    this.bookService.findByPage(pageIndex).subscribe((data) => {
      this.userMessageSource.next(data);
    });
  }

  onPageNum(pageNo: number) {
    this.pageNumSource.next(pageNo);
  }
}
