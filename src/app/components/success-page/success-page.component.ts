import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ReviewComponent } from '../review/review.component';
import { EncrDecrService } from 'src/services/encr-decr.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {


  constructor(public dialog: MatDialog) { }
  id = localStorage.getItem('orderId');
  orderId = parseInt(this.id, 4) * 7893;
  ngOnInit() {

  }

  openDialog() {
    this.dialog.open(ReviewComponent);
  }
}
