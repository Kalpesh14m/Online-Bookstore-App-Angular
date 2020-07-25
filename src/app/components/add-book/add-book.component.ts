import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorService } from 'src/services/vendor.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MessageService } from 'src/services/message.service';
import { Book } from 'src/models/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  file: any;
  isProfile = 'false';
  bookImageUrl: any;
  book = {
    bookName: null,
    authorName: null,
    price: null,
    quantity: null,
    description: null,
    imageURL: null,
  };
  constructor(
    private vendorService: VendorService,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  bookForm = new FormGroup({
    bookName: new FormControl('', Validators.required),
    authorName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.min(1), Validators.required]),
    quantity: new FormControl('', [Validators.min(1), Validators.required, Validators.pattern('[0-9]*$')]),
    description: new FormControl('', Validators.required),
    imageURL: new FormControl(this.bookImageUrl, Validators.required),
  });
  ngOnInit() {}

  onFormSubmit() {
    this.dialogRef.close();
    this.book.bookName = this.bookForm.value.bookName;
    this.book.authorName = this.bookForm.value.authorName;
    this.book.price = this.bookForm.value.price;
    this.book.quantity = this.bookForm.value.quantity;
    this.book.description = this.bookForm.value.description;
    this.book.imageURL = this.bookImageUrl;
    this.vendorService.addBook(this.book).subscribe(
      (data) => {
        if (data.status === 201) {
          this.messageService.changeMessage(1);
          this.messageService.onBooksCount();
          this.snackBar.open(data.message, 'ok', {
            duration: 2000,
          });
        }
      },
      (error) => {
        this.snackBar.open(error.message, 'cancel', {
          duration: 2000,
        });
      }
    );
  }
  onUploadBookImage(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;
      this.vendorService
        .uploadBookImage(formData, this.isProfile)
        .subscribe((data: any) => {
          if (data.status === 200) {
            this.bookImageUrl = data.data;
            console.log(data);
            console.log(this.bookImageUrl);
          }
        });
    }
  }
}
