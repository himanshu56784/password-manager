import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private pass_mng:PasswordManagerService,private route:Router){

  }

  isError : boolean = false;

  onSubmit(value:any){
    alert(`${value.email}${value.password}`)
    this.pass_mng.login(value.email,value.password)
    .then( () => {
      this.route.navigate(['site-list']);
    })
    .catch( err => {
      console.log(err);
      this.isError = true; 
    })

  }

}
