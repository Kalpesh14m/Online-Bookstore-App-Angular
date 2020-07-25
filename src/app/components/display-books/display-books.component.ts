import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/services/vendor.service';
import { MessageService } from 'src/services/message.service';
import { MatSnackBar, MatDialog, PageEvent } from '@angular/material';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-display-books',
  templateUrl: './display-books.component.html',
  styleUrls: ['./display-books.component.scss'],
})
export class DisplayBooksComponent implements OnInit {
  books = [];
  pages = [];
  totalPages: number;
  pageSize = 8;
  totalBooks: number;
  pageNum: number;
  constructor(
    private vendorService: VendorService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.messageService.booksCountMessage.subscribe((data) => {
      this.totalBooks = 0;
      this.onBooksCount(data);
    });
  }
  onBooksCount(data) {
    console.log(data);
    if (data.status === 200) {
      console.log(data.data);
      this.totalBooks = data.data;
    }
    this.messageService.currentMessage.subscribe((data) => {
      this.books = [];
      this.onDisplayBooks(data);
    });
  }
  onBookDetail(event) {
    event.stopPropagation();
  }
  onUpdateBookForm(book) {
    this.dialog.open(UpdateBookComponent, {
      width: '600px',
      data: book,
      panelClass: 'custom-modalbox',
    });
  }
  openBookForm() {
    this.dialog.open(AddBookComponent, {
      panelClass: 'custom-modalbox',
    });
  }

  onDisplayBooks(data) {
    if (data.status === 200) {
      data.data.forEach((bookData) => {
        this.books.push(bookData);
      });
      this.pages = [];
      this.totalPages = parseInt((this.totalBooks / this.pageSize).toFixed(), 10);
      if (this.totalBooks > (this.totalPages * this.pageSize)) {
        this.totalPages = this.totalPages + 1;
      }
      for (let i = 1 ; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
      console.log(this.pages);
      this.snackBar.open(data.message, 'ok', {
        duration: 2000,
      });
    }
  }

  onDeleteBook(bookId) {
    console.log(bookId);
    this.vendorService.deleteBooks(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.onBooksCount();
          if (localStorage.getItem('pageNum') === null ){
            this.pageNum = 1;
        } else {
            this.pageNum = Number(localStorage.getItem('pageNum'));
        }
          this.messageService.onBooksCount();
          this.messageService.changeMessage(this.pageNum);
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
  onApproval(bookId: any) {
    this.vendorService.onApprove(bookId).subscribe(
      (data) => {
        if (data.status === 200) {
          this.messageService.onBooksCount();
          this.messageService.changeMessage(1);
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'ok', {
          duration: 2000,
        });
      }
    );
  }
  onBooksByPage(page) {
    this.messageService.changeMessage(page);
    localStorage.setItem('pageNum',page);
  }
}
