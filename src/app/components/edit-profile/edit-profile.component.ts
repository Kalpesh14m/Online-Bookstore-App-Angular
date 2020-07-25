import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import {MatSnackBar} from '@angular/material'
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public hide:boolean=true;
  profile:string=localStorage.getItem('image');
  username:string=localStorage.getItem('username');
  password:string="**********";
  editicon:boolean=true;
  passicon:boolean=false;
  pass:string;
  file: any;
  isProfile = 'true';
  usermail:string=localStorage.getItem('email');
  fullname:string=localStorage.getItem('name');
  mobile=localStorage.getItem('mobile');
  constructor(private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {}
  update() {
    console.log('to update');
    console.log(this.fullname);
    console.log(this.password);
    let regExp=new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}');
    if(regExp.test(this.password))
    {
      this.pass=this.password;
    }
    else
      this.pass='string';
    const data={
      fullName:this.fullname,
      password:this.pass
    }
    console.log("regulae exp res:",regExp.test(this.password));
    console.log(data);
    this.userService.updateUser(data).subscribe((result:any)=>{
      console.log(result);
      if(result.status===200)
      {
        localStorage.setItem('name',data.fullName);
        this.snackBar.open(result.message, 'ok', { duration: 5000 });
      }
    },
    (error)=>
    {
      this.snackBar.open(error.error,'ok',{duration:5000});
    });
  }
  changeIcon()
  {
    this.editicon=false;
    this.passicon=true;
    console.log("came to change icon");
  }
  OnSelectedFile(event)
   {
    console.log(event.target.files[0]);
    if (event.target.files.length > 0)
    {
      this.file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);
      this.file.inProgress = true;
      console.log('FormData:', formData.get('file'));
      this.userService.uploadProfie(formData, this.isProfile).subscribe((result: any) => {
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
