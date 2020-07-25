import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';
import { BookService } from 'src/services/book.service';
import { AdminService } from 'src/services/admin.service';
import { Book } from 'src/models/book.model';
import { MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { CartServiceService } from 'src/services/cart.service';
import { CartBookModule } from 'src/models/cart-book/cart-book.module';
import { CartModule } from 'src/models/cart/cart.module';
import { MessageService } from 'src/services/message.service';
import { ViewWishlistComponent } from '../view-wishlist/view-wishlist.component';

export interface DialogData {}
@Component({
  selector: 'app-getallbooks',
  templateUrl: './getallbooks.component.html',
  styleUrls: ['./getallbooks.component.scss'],
})
export class GetallbooksComponent implements OnInit {
  // pageEvent:PageEvent;
  pageIndex: number;
  countResult: any;
  books = [];
  cart: CartModule;
  data: any;
  cartBook: CartBookModule;

  constructor(
    private bookservice: BookService,
    private snackBar: MatSnackBar,
    private cartService: CartServiceService,
    private messageService: MessageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getItems();
    this.messageService.cartMessage.subscribe((data: any) => {
      this.displayBooksInCart(data);
    });
  }

  displayBooksInCart(data) {
      if (data.status === 200) {
        this.cart = data.data;
      }
      this.messageService.currentUserMessage.subscribe((data) => {
            this.books = [];
            this.loadAllBooks(data);
          });
  }
  getServerData(pageIndex: number) {
     this.messageService.sendByPage(pageIndex);
  }

    onChange(value) {
    if (value === 'high') {
    this.messageService.changeoptionMessage();
  } else {
    if (value === 'low') {
      this.messageService.changeoptionMessage1();
      }
    }
  }

  private loadAllBooks(data) {
    if (data.status === 200) {
      data.data.forEach((bookData) => {
        this.books.push(bookData);
      });
      // this.snackBar.open(data.message, 'ok', {
      //   duration: 2000,
      // });
    }
  }

  private getItems() {
    this.bookservice.getNumberOfItems().subscribe((data: any) => {
      this.countResult = data.data;
    });
  }
  checkAddedToCart(bookId): boolean {
    let addedTocart = false;
    if (localStorage.getItem('cart') !== null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cart.cartBooks.forEach((element) => {
        if (element.book.bookId === bookId) {
          addedTocart = true;
        }
      });
    }
    if (localStorage.getItem('token') !== null) {
      this.cart.cartBooks.forEach((element) => {
        if (element.book.bookId === bookId) {
          addedTocart = true;
        }
      });
    }
    return addedTocart;
  }
  onAddBookToWishList(bookId) {
    this.bookservice.addToWishListBooks(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.onGetAllBooks();
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      },
      (error: any) => {
        this.snackBar.open(error.error, 'ok', { duration: 2000 });
      }
    );
  }

  openDialog(book) {
    const dialogRef = this.dialog.open(ViewWishlistComponent, {
      width: '500px',
      data: {
        id: book.bookId,
        bookname: book.bookName,
        bookauthor: book.authorName,
        bookprice: book.price,
        bookinfo: book.description,
        bookImage: book.imageURL
      },
    });
  }

  addToCart(book: Book) {
    if (localStorage.getItem('token') === null) {
      this.cartBook = new CartBookModule();
      this.cartBook.bookQuantity = 1;
      if (localStorage.getItem('cart') === null) {
        this.cart = new CartModule();
        this.cart.totalBooksInCart = 0;
      } else {
        this.cart = JSON.parse(localStorage.getItem('cart'));
      }
      if (this.cart.totalBooksInCart < 5) {
        this.cartBook.book = book;
        this.cartBook.totalBookPrice = Number(book.price);
        this.cart.cartBooks.forEach((element) => {
          if (element.book.bookId === book.bookId) {
            this.cart.cartBooks.splice(this.cart.cartBooks.indexOf(element), 1);
            this.cart.totalBooksInCart--;
            this.snackBar.open('Book Already Added to Cart', 'ok', {
              duration: 2000,
            });
          }
        });
        this.cart.cartBooks.push(this.cartBook);
        this.cart.totalBooksInCart++;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.snackBar.open('Book Added to Cart', 'ok', { duration: 2000 });
        localStorage.setItem('cartSize', String(this.cart.totalBooksInCart));
        this.messageService.onRefresh();
      } else {
        this.snackBar.open('Your Cart is full', 'ok', { duration: 2000 });
      }
    } else {
      this.cartService.addToCart(book.bookId).subscribe(
        (data: any) => {
          if (data.status === 200) {
            localStorage.setItem('cartSize', data.data.totalBooksInCart);
            this.messageService.cartBooks();
            this.messageService.onCartCount();
            this.snackBar.open(data.message, 'ok', {
              duration: 2000,
            });
          } else if (data.status === 208) {
            this.snackBar.open(data.message, 'ok', {
              duration: 2000,
            });
          }
        },
        (error: any) => {
          if (error.status === 500) {
            this.snackBar.open('Internal Server Error', 'ok', {
              duration: 2000,
            });
          } else {
            this.snackBar.open(error.error.message, 'ok', {
              duration: 2000,
            });
          }
        }
      );
    }
  }
}
