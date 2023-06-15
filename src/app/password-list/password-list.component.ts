import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AES,enc } from 'crypto-js';
import { ApiService } from '../services/apiService.service';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit{

  uname !: string;
  uemail !: string;
  upassword !: string;
  pass_Id !: string;

  site_Name !:string;
  site_Url !:string;
  site_ImgUrl !:string;
  site_Id !:string;

  titleMsg : string = "Add new";

  allPasswords !: Array<any>;

  isMsgShow:boolean=false;
  msgContent !: string;
  dataChangesMessage(message:string){
    this.isMsgShow = true;
    this.msgContent = message;
  }

  constructor(private route:ActivatedRoute
    ,private apiService:ApiService){

    this.route.queryParams.subscribe((val:any) => {
      this.site_Id = val.siteId;
      this.site_ImgUrl = val.siteImgUrl;
      this.site_Name = val.siteName;
      this.site_Url = val.siteUrl;
    })
    this.loadPasswords();
  }

  ngOnInit(): void {
    this.loadPasswords();
  }

  loadPasswords(){
    this.apiService.loadPasswords(this.site_Id).subscribe( val =>{
      this.allPasswords = val;
      console.log(val);
    });
  }
  onSubmit(data:any){
    data.password = this.encryptPassword(data.password);
    if(this.titleMsg == "Add new"){
      this.apiService.addPassword(this.site_Id,data).subscribe();
      this.resetForm();
      this.ngOnInit();
    }
    else if(this.titleMsg == "Edit"){
      this.apiService.updatePassword(this.pass_Id,data);
      this.resetForm();
      this.ngOnInit();
    }
  }

  resetForm(){
    this.uemail = '';
    this.uname   = '';
    this.upassword = '';
    this.pass_Id = '';
    
    this.titleMsg = "Add new";
  }

  editPasswordFild(email:string,username:string,password:string,passid:string){

    this.uemail = email;
    this.uname   = username;
    this.upassword = password;
    this.pass_Id = passid;
    this.titleMsg = "Edit";
  }

  deletePass(passid:string){
    this.apiService.deletePassword(passid).subscribe(
      val => {
        console.log(val);
      }
    )
  }

  encryptPassword(password:string){
    const secretyKey = '@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkY';
    return AES.encrypt(password,secretyKey).toString();
  }

  decryptPassword(password:string,index:number){
    const secretyKey = '@NcRfUjXn2r5u8x!A%D*G-KaPdSgVkY';
    const decrypt =  AES.decrypt(password,secretyKey).toString(enc.Utf8);

    this.allPasswords[index].password = decrypt;
  }
}
