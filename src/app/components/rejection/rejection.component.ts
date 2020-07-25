import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rejection',
  templateUrl: './rejection.component.html',
  styleUrls: ['./rejection.component.scss']
})
export class RejectionComponent implements OnInit {

  description = new FormControl('', [Validators.required]);

  constructor() { }


  ngOnInit() {
  }
  getErrorMessage() {
    if (this.description.hasError('required')) {
      return 'You must enter a message';
    }
  }
  onSubmit() {

    console.log(this.description);
    localStorage.setItem('reject', 'reject');
    localStorage.setItem('description', this.description.value);
  }
}
