import { Component, OnInit } from '@angular/core';
import { CartModule } from 'src/models/cart/cart.module';
import { CartBookModule } from 'src/models/cart-book/cart-book.module';
import { BookService } from 'src/services/book.service';
import { MessageService } from 'src/services/message.service';
import { MatSnackBar } from '@angular/material';
import { CartServiceService } from 'src/services/cart.service';
import { Book } from 'src/models/book.model';

@Component({
  selector: 'app-getallwish-list',
  templateUrl: './getallwish-list.component.html',
  styleUrls: ['./getallwish-list.component.scss']
})
export class GetallwishListComponent implements OnInit {

  books: any;
  cart: CartModule ;
  cartBook: CartBookModule ;

  constructor(private bookservice: BookService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private cartService: CartServiceService,) { }

  ngOnInit() {
    this.messageService.currentUserMessage.subscribe(data =>{
    this.loadwishlist();
  });
}


  private loadwishlist() {
    this.bookservice.viewWishlist().subscribe((data: any) => {
      this.books = data.data;
      
    },
    );
  }

  onDeleteWishList(bookId){
    console.log(bookId);
    this.bookservice.deletewishlist(bookId).subscribe(
      (data: any) => {
        if (data.status === 200) {
          this.messageService.onViewAllWishlist();
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      }),
      (error: any) => {
        this.snackBar.open(error.error.message, 'ok', {
          duration: 2000,
        });
      }
    }


    addToCart(book: Book) {
      console.log(book);
      if (localStorage.getItem('token') === null) {
        this.cartBook = new CartBookModule();
        this.cartBook.bookQuantity = 1;
        if (localStorage.getItem('cart') === null) {
          this.cart = new CartModule();
          this.cart.totalBooksInCart = 0;
        } else {
          this.cart = JSON.parse(localStorage.getItem('cart'));
          console.log(this.cart);
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
            console.log(data);
            if (data.status === 200) {
              this.messageService.onRefresh();
              localStorage.setItem('cartSize', data.data.totalBooksInCart);
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


