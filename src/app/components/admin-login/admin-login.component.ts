import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EncrDecrService } from 'src/services/encr-decr.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  hide = true;
  LoginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  title = 'Login';
  error = '';
  role1: number;
  logsuccess: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private encrDecr: EncrDecrService
  ) { }

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
          Validators.maxLength(12),
        ],
      ],
      userroles: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() {
    return this.LoginForm.controls;
  }

  onSubmit() {
    this.submitted = true;


    this.role1 = 1;


    console.log('ROLE:', this.role1);
    const data = {
      loginId: this.LoginForm.get('loginid').value,
      password: this.encrDecr.set('123456$#@$^@1ERF', this.LoginForm.get('password').value),
      role: this.role1
    };
    this.loading = true;
    this.userService.login(data).subscribe((response: any) => {
      if (response.status === 200) {
        localStorage.setItem('token', response.token);
        if (this.role1 === 1) {
          this.router.navigate(['admin-dashboard/sellers']);
        }
        this.logsuccess = true;
        this.snackBar.open(response.message, 'ok', { duration: 5000 });
      }
    },
    (error) => {
      console.log('error', error.error.message);
      this.loading = false;
      this.snackBar.open(error.error.message, 'ok', { duration: 2000 });
    });
  }

}
