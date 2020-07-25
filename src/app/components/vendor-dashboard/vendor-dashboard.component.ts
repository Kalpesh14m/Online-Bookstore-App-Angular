import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBookComponent } from '../add-book/add-book.component';
import { MessageService } from 'src/services/message.service';
import { UserService } from 'src/services/user.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss'],
})
export class VendorDashboardComponent implements OnInit {
  isBookFormOpened = false;
  file: any;
  profile: string;
  isProfile = 'true';
  pageNum: number;
  isProfileAvailable = false;
  login: boolean;
  username: string;
  usermail: string;
  updateStats: any;
  userProfile: any;
  pageTemp = 1;
  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.messageService.onBooksCount();
    if (localStorage.getItem('pageNum') === null ){
        this.pageNum = 1;
    } else {
        this.pageNum = Number(localStorage.getItem('pageNum'));
    }
    this.messageService.changeMessage(this.pageNum);
    this.username = localStorage.getItem('name');
    this.usermail = localStorage.getItem('email');
    this.userProfile = localStorage.getItem('image');
    if (this.userProfile !== 'null') {
      this.isProfileAvailable = true;
      this.profile = this.userProfile;
    } else {
      console.log(localStorage.getItem('image'));
      this.isProfileAvailable = false;
    }
  }
  openDialogztoedit() {
    this.dialog.open(EditProfileComponent);
  }
  openBookForm() {
    this.dialog.open(AddBookComponent, {
      panelClass: 'custom-modalbox',
    });
  }
  navigateTo() {
    this.router.navigate(['/vendor-dashboard']);
  }
  onKey(event: any) {
    this.messageService.searchBook(event);
  }
  Logout() {
    console.log('CAME TO LOGOUT');
    localStorage.clear();
    console.log(localStorage.length);
    this.router.navigate(['/dashboard']);
  }
  OnSelectedFile(event) {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;
      console.log('FormData:', formData.get('file'));
      this.userService
        .uploadProfie(formData, this.isProfile)
        .subscribe((result: any) => {
          console.log('PROFILE RESULT:', result);
          if (result.status === 200) {
            localStorage.setItem('image', result.data);
            this.profile = result.data;
            console.log(this.profile);
          }
        });
    }
  }
}
