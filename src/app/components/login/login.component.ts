import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { MatSnackBar, MatDialog,MatDialogConfig, MatDialogRef  } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import {User} from '../../../models/user';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import { CartServiceService } from 'src/services/cart.service';
import { MessageService } from 'src/services/message.service';
import { EncrDecrService } from 'src/services/encr-decr.service';

@Component({
  selector: 'dashboard/login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  LoginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  title = 'Book Store Login';
  error = '';
  role1: Number;
  roles: Number;
  logsuccess: boolean;
  popup:boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private encrDecr: EncrDecrService,
    private cartService: CartServiceService,
    private messageService: MessageService,
   // private dialogRef: MatDialogRef<LoginComponent>
  ) 
  {
    if(localStorage.getItem('popup')==="true")
      this.popup=true;
    else
      this.popup=false;
    console.log("popup?",this.popup);
  }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      loginid: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
      userroles: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.LoginForm.controls;
  }
  opendialogforforgotpassowrd()
  {
    console.log("to open forgot popup")
    this.dialog.open(ForgotPasswordComponent,{height: '50%',width: '50%'});
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log('Submitting');
    /* if (!this.LoginForm.valid) {
       console.log(
         'Form not valid. Please check that fields are correctly filled in'
       );
       return;
     }*/
    /* if(this.roles==')
     this.role=1;
     else {
       this.roles=2;
     }*/
    // console.log("user role:",this.LoginForm.get('userroles').value);
    if (this.LoginForm.get('userroles').value.localeCompare('admin') === 0) {
      this.role1 = 1;
    }
    if (this.LoginForm.get('userroles').value.localeCompare('vendor') === 0) {
      this.role1 = 2;
    }
    if (this.LoginForm.get('userroles').value.localeCompare('customer') === 0) {
      this.role1 = 3;
    }
    /*if(this.roles==0)
    {
      this.role1=1;
    }
   else
    {
       this.role1=2;
   }*/
    console.log('ROLE:', this.role1);
    const data = {
      loginId: this.LoginForm.get('loginid').value,
      password:this.encrDecr.set('123456$#@$^@1ERF',this.LoginForm.get('password').value),
     /* this.resetPassword.password = this.encrDecr.set(
        '123456$#@$^@1ERF',
        this.resetPassword.password
      );*/
      role: this.role1
    };
    this.loading = true;
    this.userService.login(data).subscribe((response: any) => {
      console.log('LOGIN COMPONENT:', response);
      if (response.status === 200) {
        //this.dialogRef.close();
        localStorage.setItem('token', response['token']);
        localStorage.setItem('image', response.data['imageUrl']);
        localStorage.setItem('name', response.data['name']);
        localStorage.setItem('username', response.data['userName']);
        localStorage.setItem('email', response.data['email']);
        localStorage.setItem('mobile', response.data['mobileNumber']);
        localStorage.setItem('status', response.data['userStatus']);
        if (this.role1 === 3) {
          this.messageService.onRefresh();
          this.cartService.placeOrder(JSON.parse(localStorage.getItem('cart'))).subscribe((data: any) => {
            if (data.status === 200){
              this.messageService.cartBooks();
              this.messageService.onCartCount();
              localStorage.removeItem('cart');
            }
          }, (error: any) => {
            if (error.status === 417){
              this.messageService.cartBooks();
              localStorage.removeItem('cart');
              this.snackBar.open(error.error.message, 'ok', {
                duration: 2000
              });
            }
            this.snackBar.open(error.error.message, 'ok', {
              duration: 2000
            });
          });
        }
        if (this.role1 === 1) {
          this.router.navigate(['admin-dashboard']);
        }
        if (this.role1 === 2) {
          this.router.navigate(['vendor-dashboard']);
        }
        this.logsuccess = true;
        //console.log('user has been successfully logged in:');
        this.snackBar.open(response.message, 'ok', { duration: 5000 });
      }
    },
    (error) => {
      //console.log(error);
      this.loading = false;
     // if (error.status === 400) {
        this.snackBar.open(error.error.message, 'ok', { duration: 2000 });
     // }
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}