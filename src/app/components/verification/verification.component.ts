import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userservice : UserService,private router: Router,private snackBar: MatSnackBar) { }

  private token :string;
  ngOnInit() {
    this.token=this.route.snapshot.paramMap.get('token');
  }

  onVerify(){
    this.userservice.verification(this.token).subscribe((response:any)=>{
      console.log(response);
      if(response.statusCode === 202){
        this.snackBar.open(response.message,'ok',{duration:3000});
        this.router.navigate(['login']);
      }
    },(error:any)=>{
      this.snackBar.open(error.error.error,'ok',{duration:3000})
    })
  }

}
