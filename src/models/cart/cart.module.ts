import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CartModule {
  cartId: any;
  totalBooksInCart: number;
  cartBooks: any = [];
}
