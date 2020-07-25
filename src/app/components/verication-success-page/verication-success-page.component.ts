import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-verication-success-page',
  templateUrl: './verication-success-page.component.html',
  styleUrls: ['./verication-success-page.component.scss']
})
export class VericationSuccessPageComponent implements OnInit {
  token:string;
  constructor(private route: ActivatedRoute,
              private router:Router,
              private service:UserService,
              private snackbar:MatSnackBar) 
  {
    this.token=this.route.snapshot.paramMap.get('token');
    this.service.verifyUser(this.token).subscribe((result:any)=>{
      if(result.status==200)
      {
        this.router.navigate(['/verificationSuccess/:this.token']);
      }
    },
    (error)=>{
        this.snackbar.open(error.error.message,'ok',{duration:5000});
    });
    console.log("token:",this.token);

  }
  onclick()
  {
    this.router.navigate(['/dashboard']);
  }
  ngOnInit() {
  }

}
