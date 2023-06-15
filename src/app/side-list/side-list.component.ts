import { Component } from '@angular/core';
import { Observable, config } from 'rxjs';
import { ApiService } from '../services/apiService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent {
  
  constructor(private api:ApiService,
    private router:Router){
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
      this.allSites = this.api.addSite(values,sessionStorage.getItem('ur-token'));
      if(this.allSites){
        this.dataChangesMessage("Data Save Succesfully");
        this.loadSites();
      }else{
        console.log("error come in add sites");
      }
      
    }
    else if(this.formHeading == "Edit"){
      this.api.updateSite(this.site_Id,values).subscribe(
        val => console.log(val)
      );
      this.router.navigateByUrl('/').then(val => {
        this.router.navigateByUrl(this.router.url);
      });
    }
  }

  loadSites(){
    this.allSites = this.api.loadSite(sessionStorage.getItem('ur-token'));
  }

  UpdateSite(sitename:string,siteUrl:string,siteImgUrl:string,siteId:string){
    this.site_Id = siteId;
    this.site_ImgUrl = siteImgUrl;
    this.site_Name = sitename;
    this.site_Url = siteUrl;
    this.formHeading = "Edit";
  }

  deleteSite(siteId:string){
    this.api.deleteSite(siteId);
    this.loadSites();
  }

}
