import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Book } from 'src/models/book.model';
import { MessageService } from 'src/services/message.service';
import { VendorService } from 'src/services/vendor.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  book: any;
  pageNum: number;
  constructor(
    private vendorService: VendorService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}
  updateBookForm = new FormGroup({
    price: new FormControl('', [Validators.min(0), Validators.required]),
    quantity: new FormControl('', [Validators.min(1), Validators.required]),
  });

  ngOnInit() {}
  onFormSubmit() {
    this.dialogRef.close();
    this.vendorService
      .updateBook(this.updateBookForm.value, this.data.bookId)
      .subscribe((data) => {
        this.messageService.onBooksCount();
        if (localStorage.getItem('pageNum') === null ){
          this.pageNum = 1;
      } else {
          this.pageNum = Number(localStorage.getItem('pageNum'));
      }
        this.messageService.changeMessage(this.pageNum);
      });
  }
}
