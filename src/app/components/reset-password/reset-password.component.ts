import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PasswordValidator } from 'src/app/shared/passwordValidator';
import { ResetPassword } from 'src/models/reset-password.model';
import { EncrDecrService } from 'src/services/encr-decr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  hide1 = true;
  title = 'Reset Password';
  private encryptPassword: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private encrDecr: EncrDecrService
  ) {}
  public resetPasswordForm: FormGroup;
  private resetPassword: ResetPassword;
  private token: string;
  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: PasswordValidator }
    );
    this.token = this.route.snapshot.paramMap.get('token');
    ///((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$%]).{8,20})/
  }

  onConfirm() {
    /*this.resetPassword = this.resetPasswordForm.value;
    console.log(this.resetPassword.password+" token:",this.token);
    this.resetPassword.password = this.encrDecr.set(
      '123456$#@$^@1ERF',
      this.resetPassword.password
    );
    console.log(this.resetPassword.password);*/
    const data={
      password:this.encrDecr.set('123456$#@$^@1ERF',this.resetPasswordForm.get('confirmPassword').value),
      confirmpassword:this.encrDecr.set('123456$#@$^@1ERF',this.resetPasswordForm.get('confirmPassword').value),
    }
   // console.log("data:",data);
   // console.log("token:",this.token);
    this.userService.resetPassword(data, this.token).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 201) {
          this.snackBar.open(response.message, 'ok', { duration: 3000 });
          //this.router.navigate(['login']);
        }
      },
      (error: any) => {
        //console.log(error);
        this.snackBar.open(error.error, 'ok', { duration: 3000 });
      }
    );
  }
}
