import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-get-all-sellers',
  templateUrl: './get-all-sellers.component.html',
  styleUrls: ['./get-all-sellers.component.scss']
})
export class GetAllSellersComponent implements OnInit {

  constructor(private messageService: MessageService,
              private snackBar: MatSnackBar) { }

  profile = './assets/images/user.png';
  users: any = [];
  counter = 0;
  found = false;
  ngOnInit() {

    this.messageService.adminSeller.subscribe((data) => {
      this.users = [];
      this.onGetSellers(data);
    });
  }

  onGetSellers(data) {

    if (data.status === 200) {
      data.data.forEach((userData) => {
        this.users.push(userData);
        this.found = true;
      });

      this.snackBar.open(data.message, 'ok', {
        duration: 2000,
      });
    }
  }
  onLink(user: any) {
    localStorage.setItem('sellerId', user.id);
  }

}
