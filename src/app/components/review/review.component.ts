import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  review: any;
  rating: any;
  data: any;
  constructor(private service: ReviewService) { }

  ngOnInit() {}

  onRating(value: any) {
    this.rating = value;
  }
  onSubmit() {
    console.log(this.rating);
    this.service.addReviewApp(this.review, this.rating, localStorage.getItem('token')).subscribe((data) => {
      this.rating = data.data.rating;
      this.review = data.data.review;
    });
  }
}
