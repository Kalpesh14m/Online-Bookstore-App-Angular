import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../getallbooks/getallbooks.component';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent implements OnInit {

constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {}
}
