import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  message: string ="";
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
    this.myForm = this.fb.group({
      email:['',[Validators.email, Validators.required]],
      pwd:['',[Validators.required]]
    })
   }

  ngOnInit() {
  }

  onSubmit(myForm){
    this.authService.login(myForm.value.email,myForm.value.pwd).then((data) =>{
      console.log(data);
      this.message=  "You have been logged in successfully!"
      this.router.navigate(['/myblogs'])
      
    }).catch((error) =>{
      console.log(error);
      this.userError = error;
    })
  }

}
