import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private apiService:ApiService,private route:Router){
    if(sessionStorage.getItem('ur-token')){
      this.route.navigate(['/site-list']);
    }
  }

  valid:any;

  isError : boolean = false;

  onSubmit(value:any){
    this.apiService.loginUser(value.email,value.password)
    .subscribe(
      (response) => {
        if(response){
          this.valid = response.object
          sessionStorage.setItem('ur-token',this.valid.registrationId);
          this.route.navigate(['/site-list']);
        }else{
          alert("wrong user email and password");
        }
      }
    );

    

    

  }

}
