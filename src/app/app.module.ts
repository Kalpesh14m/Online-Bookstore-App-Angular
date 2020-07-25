import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import {
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/services/user.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerificationComponent } from './components/verification/verification.component';
import { EncrDecrService } from 'src/services/encr-decr.service';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminComponent } from './components/admin/admin.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpService } from 'src/services/http.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';

import { AddBookComponent } from './components/add-book/add-book.component';
import { DisplayBooksComponent } from './components/display-books/display-books.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { VendorService } from 'src/services/vendor.service';

import { GetAllSellersComponent } from './components/get-all-sellers/get-all-sellers.component';

import { GetBooksForVerificationComponent } from './components/get-books-for-verification/get-books-for-verification.component';
import { GetallbooksComponent } from './components/getallbooks/getallbooks.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CartComponent } from './components/cart/cart.component';
import { ReviewComponent } from './components/review/review.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';

import { CdkColumnDef } from '@angular/cdk/table';
import { ReviewService } from 'src/services/review.service';
import { ViewWishlistComponent } from './components/view-wishlist/view-wishlist.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { BookReviewComponent } from './components/book-review/book-review.component';
import { GetallwishListComponent } from './components/getallwish-list/getallwish-list.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { VericationSuccessPageComponent } from './components/verication-success-page/verication-success-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatPaginatorModule} from '@angular/material';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RejectionComponent } from './components/rejection/rejection.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    VerificationComponent,
    AdminComponent,

    VendorDashboardComponent,
    AddBookComponent,
    DisplayBooksComponent,
    EditProfileComponent,

    GetAllSellersComponent,

    GetBooksForVerificationComponent,
    GetallbooksComponent,
    UpdateBookComponent,
    AdminLoginComponent,
    CartComponent,
    ReviewComponent,
    SuccessPageComponent,
    ViewWishlistComponent,
    MyordersComponent,
    BookReviewComponent,
    GetallwishListComponent,
    VericationSuccessPageComponent,
    PaginationComponent,
    RejectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatBadgeModule,
    NgxSpinnerModule,
    MatPaginatorModule
  ],

  entryComponents: [
    EditProfileComponent,
    ForgotPasswordComponent,
    ReviewComponent,
    BookReviewComponent,
    RejectionComponent
  ],

  providers: [
    UserService,
    EncrDecrService,
    HttpService,
    VendorService,
    CdkColumnDef,
    ReviewService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
