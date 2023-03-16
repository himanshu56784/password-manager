import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent {
  
  constructor(private pass_manag:PasswordManagerService){
    this.loadSites();
  }
  allSites !:Observable<Array<any>>;
  site_Name !:string;
  site_Url !:string;
  site_ImgUrl !:string;
  site_Id !:string;
  
  formHeading : string = "Add New"; 
  isMsgShow:boolean=false;
  msgContent !: string;
  dataChangesMessage(message:string){
    this.isMsgShow = true;
    this.msgContent = message;
  }
  onSubmit(values:any){
    if(this.formHeading == "Add New"){
      this.pass_manag.addSite(values)
      .then(()=>{
        this.dataChangesMessage("Data Save Succesfully");
      })
      .catch( (err)=> {
        console.log(err);
      })
    }
    else if(this.formHeading == "Edit"){
      this.pass_manag.updateSite(this.site_Id,values)
      .then(()=>{
        this.dataChangesMessage("Data Update Succesfully");
      })
      .catch( (err)=> {
        console.log(err);
      })
    }
  }

  loadSites(){
    this.allSites = this.pass_manag.loadSite()
    console.log(this.allSites);
  }

  UpdateSite(sitename:string,siteUrl:string,siteImgUrl:string,siteId:string){
    this.site_Id = siteId;
    this.site_ImgUrl = siteImgUrl;
    this.site_Name = sitename;
    this.site_Url = siteUrl;
    this.formHeading = "Edit";
  }

  deleteSite(siteId:string){
    this.pass_manag.deleteDatafromSite(siteId)
    .then(()=>{
      this.dataChangesMessage("Data Deleted Succesfully");
    })
    .catch( (err)=> {
      console.log(err);
    })
  }

}
