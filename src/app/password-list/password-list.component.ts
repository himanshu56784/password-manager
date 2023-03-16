import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';
import { AES,enc } from 'crypto-js';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  uname !: string;
  uemail !: string;
  upassword !: string;
  pass_Id !: string;

  site_Name !:string;
  site_Url !:string;
  site_ImgUrl !:string;
  site_Id !:string;

  titleMsg : string = "Add new";

  allPasswords !: Observable<Array<any>>;

  isMsgShow:boolean=false;
  msgContent !: string;
  dataChangesMessage(message:string){
    this.isMsgShow = true;
    this.msgContent = message;
  }

  constructor(private route:ActivatedRoute,private pass_manag:PasswordManagerService){

    this.route.queryParams.subscribe((val:any) => {
      this.site_Id = val.siteId;
      this.site_ImgUrl = val.siteImgUrl;
      this.site_Name = val.siteName;
      this.site_Url = val.siteUrl;
    })
    this.allPasswords = this.pass_manag.loadPasswords(this.site_Id);
  }
  onSubmit(data:any){
    

    if(this.titleMsg == "Add new"){

      this.pass_manag.addPassword(data,this.site_Id)
      .then( () =>{
        this.dataChangesMessage('password store successfully');
      })
      .catch( (err) => {
        console.log(err);
      })  
    }
    else if(this.titleMsg == "Edit"){
      this.pass_manag.updatePassword(this.site_Id,this.pass_Id,data)
      .then( () => {
        this.dataChangesMessage('password update successfully');
        this.resetForm();
      })
      .catch( (err) => {
        console.log(err);
      })
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

    this.pass_manag.deletePasswordFromPasswords(this.site_Id,passid)
      .then( () => {
        this.dataChangesMessage('password delete successfully');
      })
      .catch( (err) => {
        console.log(err);
      })
  }

  encryptPassword(){
    
  }

}
