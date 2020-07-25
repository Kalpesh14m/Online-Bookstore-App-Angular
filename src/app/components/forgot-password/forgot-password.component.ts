import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/services/user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private userService: UserService, private snackBar: MatSnackBar,private router: Router) { }

  forgotPasswordForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email])
  });

  get emailId() {
    return this.forgotPasswordForm.get('emailId');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.forgotPasswordForm.value);
    this.userService.forgotPassword(this.emailId.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 201) {
          console.log('Verifivation link send to your mailid,please your check mail');
          this.snackBar.open(response.message, 'ok', { duration: 5000 });
          console.log(response.object);
         // localStorage.setItem('forgotoken', response.object);
          //this.router.navigate(['resetpassword/:token'])
        }
      }, (error: any) => {
        console.log(error);
        if (error.status === 401) {
          this.snackBar.open(error.error.error, 'ok', { duration: 2000 });
        }
      });
  }

}
