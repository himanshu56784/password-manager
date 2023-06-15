import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/apiService.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private apiService:ApiService,private route:Router){}

  onSubmit(value:any){
    this.apiService.registrationUser(value);
    this.route.navigate(['site-list']);
  }
}
