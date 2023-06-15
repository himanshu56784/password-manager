import { Injectable } from "@angular/core";
import { HttpService } from "./httpService.service";

@Injectable({
    providedIn:"root"
  })
  export class ApiService{
  constructor(private http:HttpService){}
  
  /* Sites rest api call */
  loadSite(arg1: string | null){
    return this.http.get(`/sites/${arg1}`);
  }
  addSite(values: any, arg1: string | null) {
    return this.http.post(`/sites/save/${arg1}`,{
        siteUrl:values.siteUrl,
        siteName:values.siteName,
        imageUrl:values.siteImgUrl
    })
  }
  updateSite(site_Id: string, values: any) {
    return this.http.post(`/sites/update/${site_Id}`,{
      siteUrl:values.siteUrl,
      siteName:values.siteName,
      imageUrl:values.siteImgUrl
    });
  }
  deleteSite(site_Id:string){
    return this.http.delete(`/sites/delete/${site_Id}`);
  }

  /* Passwords rest api call */
  loadPasswords(site_Id: string) {
      return this.http.get(`/password/${site_Id}`);
  }
  addPassword(site_Id: string, data: any) {
    return this.http.post(`/password/save/${site_Id}`,{
      emailId:data.email,
      userName:data.username,
      password:data.password
    });
  }
  updatePassword(pass_Id: string, data: any) {
      return this.http.post(`/password/update/${pass_Id}`,{
        emailId:data.email,
        userName:data.username,
        password:data.password
      });
  }
  deletePassword(pass_Id:string){
    return this.http.delete(`/password/delete/${pass_Id}`);
  }


  /* Auth rest api call */
  loginUser(email:string,password:string){
        return this.http.post('/login/',{
            userEmail:email,
            password:password
        })
  }

  registrationUser(data:any){
    return this.http.post('/registration/save',{
      userEmail:data.email,
      userName:data.username,
      password:data.password
    });
  }


}