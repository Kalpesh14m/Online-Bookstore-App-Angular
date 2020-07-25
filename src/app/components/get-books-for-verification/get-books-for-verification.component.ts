import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AdminService } from 'src/services/admin.service';
import { RejectionComponent } from '../rejection/rejection.component';

@Component({
  selector: 'app-get-books-for-verification',
  templateUrl: './get-books-for-verification.component.html',
  styleUrls: ['./get-books-for-verification.component.scss'],
})
export class GetBooksForVerificationComponent implements OnInit {

  books: any;
  response: any;
  click = [];
  verify = [];

  counter = 0;

  constructor(
    private service: AdminService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.service.getAllBooksForVerification().subscribe((data: any) => {
      this.books = data.data;
    });
  }

  onApprove(book: any) {

    this.service.verfy(book.bookId, localStorage.getItem('sellerId'), true).subscribe((data: any) => {

      this.snackBar.open(data.message, 'ok', { duration: 5000 });
      this.counter = book.bookId;
      this.click[book.bookId] = this.counter;
      this.verify[book.bookId] = 'true';
    });
  }
  onReject(book: any) {
    this.dialog.open(RejectionComponent, {width: '30%'});
    if (localStorage.getItem('reject') === 'reject') {
    this.service.verfy(book.bookId, localStorage.getItem('sellerId'), false).subscribe((data: any) => {

      this.snackBar.open(data.message, 'ok', { duration: 5000 });
      this.counter = book.bookId;
      this.click[book.bookId] = this.counter;
      this.verify[book.bookId] = 'false';
    });
  }
  }
}
