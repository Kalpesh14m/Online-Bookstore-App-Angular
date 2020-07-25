import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { EncrDecrService } from 'src/services/encr-decr.service';
import { Router } from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  number1:boolean;
  symbol1:boolean;
  email = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9][a-zA-Z0-9_.]*@[a-zA-Z0-9]+([.][a-zA-Z]+)+')]);
  name = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-z]+([\\s][a-zA-Z]+)*$')
  ]));
  phone = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern('(0|9)?[7-9][0-9]{9}')
  ]));
  password = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(16),
    Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
  ]));
  username = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(4),
    Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
  ]));
  passwordType = 'password';
  show = false;
  radioval=0;
  selectedrole;
  constructor(private service: UserService,
    private EncrDecr: EncrDecrService,
    private router: Router,
    private dialog:MatDialog,
    private snackbar:MatSnackBar)
    {}

  ngOnInit() { }

  onclick() {
    if (this.show) {
      this.passwordType = 'password';
      this.show = false;
    } else {
      this.passwordType = 'text';
      this.show = true;
    }
  }
  onRegister() {
    if (this.email.hasError('required') || this.name.hasError('required') ||
      this.password.hasError('required') || this.phone.hasError('required') ||
      this.username.hasError('required')) {
      this.snackbar.open('Cannot submit empty fields', 'ok', { duration: 5000 });
    } else if (this.email.hasError('email') || this.name.hasError('minlength') ||
      this.password.hasError('minlength') || this.password.hasError('maxlength') ||
      this.phone.hasError('minlength')) {
      this.snackbar.open('Cannot submit invalid input','ok',{duration:5000});
    }else if (isNaN(this.phone.value)) {
      this.snackbar.open('Phone Number should be digits only','ok',{duration:5000});
    }
    else if(this.radioval==0)
    {
      this.snackbar.open('Select the role','ok',{duration:5000});
    } else {
      if(this.radioval==2)
      {
        this.selectedrole=2;
      }
       else if(this.radioval==3)
      {
        this.selectedrole=3;
      }
      const data = {
        email: this.email.value,
        name: this.name.value,
        mobileNumber: this.phone.value,
        //password: this.password.value,
        password:this.EncrDecr.set('123456$#@$^@1ERF',this.password.value),
        userName: this.username.value,
        role:this.selectedrole
      };
      this.service.register(data).subscribe((response: any) => {
        if(response.status==200)
        {
          localStorage.setItem("popup","true");
          this.snackbar.open(response.message,'ok',{duration:5000});
          this.router.navigate(['/login']);
        }
        else
        {
          this.snackbar.open(response.message,'Canecl',{duration:5000});
        }
      });
    }
  }

  onLogin() {
      //const dialogRef = this.dialog.open(LoginComponent, {
     //  width: '40%',
     //  height:'90%',
      //});
      localStorage.setItem("popup","true");
    this.router.navigate(['/login']);
  }
}
