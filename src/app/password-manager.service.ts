import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore:Firestore,private auth:Auth){ }

  addSite(data:Object){
    const dbInst = collection(this.firestore,'sites');
    return addDoc(dbInst,data );
  }
  
  loadSite(){
    const dbInst = collection(this.firestore,'sites');
    return collectionData(dbInst,{idField:'id'});
  }

  updateSite(site_Id:string,data:any){
    const docInstance = doc(this.firestore,'sites',site_Id);
    return updateDoc(docInstance,data);
  }

  deleteDatafromSite(site_Id:string){
    const docInstance = doc(this.firestore,'sites',site_Id);
    return deleteDoc(docInstance);
  }

  addPassword(value:Object,site_Id:string){
    const dbInstance = collection(this.firestore,`sites/${site_Id}/passwords`);
    return addDoc(dbInstance,value);
  }

  loadPasswords(site_Id:string){
    const dbInstance = collection(this.firestore,`sites/${site_Id}/passwords`);
    return collectionData(dbInstance,{idField:'id'});
  }

  updatePassword(site_id:string,passId:string,value:any){
    const docInstance = doc(this.firestore,`sites/${site_id}/passwords`,passId);
    return updateDoc(docInstance,value);
  }

  deletePasswordFromPasswords(site_id:string,passId:string){
    const docInstance = doc(this.firestore,`sites/${site_id}/passwords`,passId);
    return deleteDoc(docInstance);
  }

  login(email:string,pass:string){
  return  signInWithEmailAndPassword(this.auth,email,pass);
  }

}
