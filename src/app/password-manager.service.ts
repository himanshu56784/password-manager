import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc, collectionData, doc, updateDoc, deleteDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore:Firestore){ }

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
}
