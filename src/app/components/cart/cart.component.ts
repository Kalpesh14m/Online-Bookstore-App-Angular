import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Book } from 'src/models/book.model';
import { CartServiceService } from 'src/services/cart.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MessageService } from 'src/services/message.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { CartModule } from 'src/models/cart/cart.module';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CartBookModule } from 'src/models/cart-book/cart-book.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit ,OnChanges{
  public show = false;
  public buttonName: any = 'Show';
  cartSize: number;
  cartBooks: any = [];
  quantity: number;
  bookSum: any = [];
  image = './assets/images/bookstore-wallpaper.jpg';
  disp = false;
  cart: CartModule;
  totalPrice: number;

  constructor(
    private cartService: CartServiceService,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private dialog: MatDialog
  ) {}

  addressGroup = this.fb.group({
    name: [],
    phone: [],
    pincode: [],
    locality: [],
    address: [],
    city: [],
    landmark: [],
    type: [],
  });
  ngOnInit() {
    this.messageService.cartMessage.subscribe((data) => {
      this.cartBooks = [];
      this.totalPrice = 0;
      this.displayBooksInCart(data);
      localStorage.setItem('cartSize', String(this.cartSize));
    });
    this.cartSize = Number(localStorage.getItem('cartSize'));
    this.messageService.quantityMessage.subscribe((data) => {
      this.onUpdateQuantity(data);
      localStorage.setItem('cartSize', String(this.cartSize));
    });
  }
  ngOnChanges(){
    this.messageService.onCartRefresh();
  }

  removeFromCart(cartBook: any) {
    if (
      localStorage.getItem('token') === null &&
      localStorage.getItem('cart') != null
    ) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.cart.cartBooks.forEach((element) => {
        if (element.book.bookId === cartBook.book.bookId) {
          this.cart.totalBooksInCart =
            this.cart.totalBooksInCart - element.bookQuantity;
          this.cart.cartBooks.splice(this.cart.cartBooks.indexOf(element), 1);
        }
      });
      localStorage.setItem('cart', JSON.stringify(this.cart));
      console.log(localStorage.getItem('cartSize'));
      localStorage.setItem('cartSize', String(this.cart.totalBooksInCart));
      this.messageService.cartBooks();
      this.messageService.onCartRefresh();
      this.snackBar.open('Book Removed From Cart', 'ok', {
        duration: 2000,
      });
    } else {
      this.cartService.removeFromCart(cartBook.cartBookId).subscribe(
        (data: any) => {
          if (data.status === 200) {
            localStorage.setItem('cartSize', data.data.totalBooksInCart);
            this.messageService.cartBooks();
            this.messageService.onCartCount();
            this.snackBar.open(data.message, 'ok', {
              duration: 2000,
            });
          }
        },
        (error: any) => {
          this.snackBar.open(error.error.message, 'ok', {
            duration: 2000,
          });
        }
      );
    }
  }

  displayBooksInCart(data) {
    if (localStorage.getItem('token') === null) {
      this.cartSize = data.totalBooksInCart;
      this.cart = data.cartBooks.forEach((cartBookData) => {
        this.cartBooks.push(cartBookData);
        // console.log(cartBookData);
        // this.totalPrice = this.totalPrice + cartBookData.totalBookPrice;
      });
    } else {
      if (data.status === 200) {
        this.cartSize = data.data.totalBooksInCart;
        data.data.cartBooks.forEach((cartBookData) => {
          console.log(cartBookData);
          this.totalPrice = this.totalPrice + cartBookData.totalBookPrice;
          this.cartBooks.push(cartBookData);
        });
      }
    }
  }

  addQuantity(cartBook: any) {
    if (
      localStorage.getItem('token') === null &&
      localStorage.getItem('cart') != null
    ) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.totalBooksInCart < 5) {
        this.cart.cartBooks.forEach((element) => {
          if (element.book.bookId === cartBook.book.bookId) {
            if (element.bookQuantity < cartBook.book.quantity) {
              element.bookQuantity++;
              element.totalBookPrice += cartBook.book.price;
              this.cart.totalBooksInCart++;
            } else {
              this.snackBar.open('Book Out Of Stock', 'ok', { duration: 2000 });
            }
          }
        });
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('cartSize', String(this.cart.totalBooksInCart));
        this.messageService.cartBooks();
        this.messageService.onCartRefresh();
        this.snackBar.open('Book Quantity Increased', 'ok', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Cart is full', 'ok', { duration: 2000 });
      }
    } else {
      this.cartService.addQuantity(cartBook.cartBookId).subscribe(
        (data: any) => {
          if (data.status === 200) {
            localStorage.setItem('cartSize', String(data.data.totalBooksInCart));
            this.messageService.cartBooks();
            this.messageService.onCartCount();
            this.snackBar.open(data.message, 'ok', {
              duration: 2000,
            });
          }
        },
        (error: any) => {
          this.snackBar.open(error.error.message, 'ok', {
            duration: 20000,
          });
        }
      );
    }
  }

  onPlaceOrder() {
    if (localStorage.getItem('token') === null ) {
      this.dialog.open(LoginComponent);
    }
    this.show = true;
    this.checkAddressExistornot();
    // this.snackBar.open('Order Placed', 'ok', {
    //   duration: 2000
    // });
  }
  continue() {
    this.cartService.displayBooksInCart().subscribe((response: any) => {
      console.log('book in cart:', response);
      this.bookSum = response.data.cartBooks;
      this.bookSum.forEach(function (val) {
        console.log('book1:', val);
        console.log('name:', val.book.bookName);
      });
    });
    this.disp = true;
  }

  removeQuantity(cartBook: any) {
    if (
      localStorage.getItem('token') === null &&
      localStorage.getItem('cart') != null
    ) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.totalBooksInCart > 0) {
        this.cart.cartBooks.forEach((element) => {
          if (element.book.bookId === cartBook.book.bookId) {
            if (element.bookQuantity > 1) {
              element.bookQuantity--;
              element.totalBookPrice -= cartBook.book.price;
              this.cart.totalBooksInCart--;
            } else {
              this.snackBar.open('Cart items cant be less than 1', 'ok', {
                duration: 2000,
              });
            }
          }
        });
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('cartSize', String(this.cart.totalBooksInCart));
        this.messageService.cartBooks();
        this.messageService.onCartRefresh();
        this.snackBar.open('Book Quantity Decreased', 'ok', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('No Items In cart To remove quantity', 'ok', {
          duration: 2000,
        });
      }
    } else {
      this.cartService.removeQuantity(cartBook.cartBookId).subscribe(
        (data: any) => {
          if (data.status === 200) {
            localStorage.setItem('cartSize', data.data.totalBooksInCart);
            this.messageService.cartBooks();
            this.messageService.onCartCount();
            this.snackBar.open(data.message, 'ok', {
              duration: 2000,
            });
          }
        },
        (error: any) => {
          this.snackBar.open(error.error.message, 'ok', {
            duration: 20000,
          });
        }
      );
    }
  }
  onCheckOut() {
    const data={
      name:this.addressGroup.get('name').value,
      phoneNumber:this.addressGroup.get('phone').value,
      pincode:this.addressGroup.get('pincode').value,
      locality:this.addressGroup.get('locality').value,
      address:this.addressGroup.get('address').value,
      city:this.addressGroup.get('city').value,
      landmark:this.addressGroup.get('landmark').value,
      addressType:this.addressGroup.get('type').value
    };
    this.userService.Address(data).subscribe((result:any)=>{
      if(result.status==200)
      {
        this.snackBar.open('address added','ok',{duration:5000});
      }
    });
    this.userService.onCheckOut().subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.onCartCount();
          localStorage.setItem('orderId', data.data.orderId);
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
          this.route.navigate(['/dashboard/successPage']);
        }
      },
      (error: any) => {
        this.snackBar.open(error.error.message, 'ok', {
          duration: 2000,
        });
      }
    );
  }
  onShowNow() {
    this.route.navigate(['/dashboard/getallbooks']);
  }

  onKey(event: any,cartBook: CartBookModule) {
    if(localStorage.getItem('token') === null && localStorage.getItem('cart') !== null) {
      this.quantity = 0;
      this.quantity = Number(event.target.value);
      if (this.quantity === 0 || event.target.value === '') {
        this.snackBar.open('Cart Items Can not be less than one', 'cancel', {
          duration: 2000
        });
      } else {
        this.cart = JSON.parse(localStorage.getItem('cart'));
        this.cart.totalBooksInCart = this.cart.totalBooksInCart - cartBook.bookQuantity;
        if ((this.cart.totalBooksInCart + this.quantity) < 6) {
          this.cart.cartBooks.forEach(element => {
            if (element.book.bookId === cartBook.book.bookId) {
              if (Number(cartBook.book.quantity) > this.quantity){
                element.bookQuantity = this.quantity;
                element.totalBookPrice = element.book.price * this.quantity;
                this.cart.totalBooksInCart = this.cart.totalBooksInCart + this.quantity;
              } else {
                this.snackBar.open('Book Out Of Stock', 'ok', {
                  duration: 2000
                });
              }
            }
          });
          localStorage.setItem('cart', JSON.stringify(this.cart));
          localStorage.setItem('cartSize', String(this.cart.totalBooksInCart));
          this.messageService.cartBooks();
          this.messageService.onCartRefresh();
          this.snackBar.open('Quantity Updated SuccessFully', 'ok', {
            duration: 2000,
          });
        } else {
          this.messageService.cartBooks();
          this.messageService.onCartRefresh();
          this.snackBar.open('Cart Books Exceeded limit of 5 Books', 'ok', {
            duration: 2000
          });
        }
      }
    }
    if(localStorage.getItem('token') !== null){
      this.messageService.onUpdateQuantity(event, cartBook.cartBookId);
    }
  }

  onUpdateQuantity(data){
    if(data.status === 200){
      this.cartSize = data.totalBooksInCart;
      this.messageService.cartBooks();
      this.messageService.onCartCount();
      this.snackBar.open(data.message, 'ok', {
        duration: 2000
      });
    } else if (data.status === 417) {
      this.messageService.cartBooks();
      this.snackBar.open(data.error.message, 'cancel', {
        duration: 2000
      });
    } else if (data.status === 404) {
      this.messageService.cartBooks();
      this.snackBar.open(data.error.message, 'cancel', {
        duration: 2000
      });
    }
  }
  checkAddressExistornot()
  {
      this.userService.getAddress('home').subscribe((result:any)=>{
          if(result.status==200)
          {
            console.log("Entered to get home address");
            console.log("home address:",result)
            this.addAddress(result.data);
          }
        },
        (error=>{
          console.log("Entered to get work address");
          this.userService.getAddress('work').subscribe((response:any)=>{
            if(response.status==200)
            {
              console.log("office Address:",response);
              this.addAddress(response.data);
            }
          },
          (error=>{
            this.snackBar.open('you have not provided any address,Please fill your address','ok',{duration:5000});
          }));
      }));
  }
  addAddress(addr)
  {
    console.log("address in add address:",addr);
    this.addressGroup.get('name').setValue(addr.name);
    this.addressGroup.get('phone').setValue(addr.phoneNumber);
    this.addressGroup.get('pincode').setValue(addr.pincode);
    this.addressGroup.get('locality').setValue(addr.locality);
    this.addressGroup.get('address').setValue(addr.address);
    this.addressGroup.get('city').setValue(addr.city);
    this.addressGroup.get('landmark').setValue(addr.landmark);
    this.addressGroup.get('type').setValue(addr.addressType);
    this.addressGroup.disable();
  }
  onedit()
  {
    console.log("to enable fiedls");
    this.addressGroup.enable();
  }
  selectAddrType(event:any)
  {
    this.addressGroup.reset();
    this.addressGroup.get('type').setValue(event.value);
    this.userService.getAddress(event.value).subscribe((result:any)=>{
      if(result.status==200)
        this.addAddress(result.data);
    },
    (error: any) => {
      this.snackBar.open(error.error.message, 'ok', { duration: 3000 });
    });
  }
}
