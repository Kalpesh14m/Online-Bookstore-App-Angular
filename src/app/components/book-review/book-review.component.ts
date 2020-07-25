import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/services/review.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.scss']
})
export class BookReviewComponent implements OnInit {

  review: any;
  rating: any;
  data: any;
  constructor(private service: ReviewService,
              private snackbar:MatSnackBar,
              private router:Router
              ) { }

  ngOnInit() {}

  onRating(value: any) {
    this.rating = value;
  }
  onSubmit() {
    console.log(this.rating);
    console.log(this.review);
    console.log("Book Review");
    /*this.service.addReviewApp(this.review, this.rating, localStorage.getItem('token')).subscribe((data) => {
      this.rating = data.data.rating;
      this.review = data.data.review;
      if(result.staus==200)
      {
      }
    });*/
    this.service.addReview(this.review,this.rating).subscribe((result:any)=>{
        console.log("successfully added rating",result);
        if(result.status==200)
        {
          localStorage.setItem('bookRating',this.rating);
          this.snackbar.open("Thank you for your valueble feedback","ok",{duration:5000});
        }
    });
  }

}
