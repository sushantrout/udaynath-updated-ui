import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationBlobData } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public profilePic = new BehaviorSubject<any>(null);
  currentUser: any;
  
  constructor() { }

  setProfilepic(profilePicdata : ApplicationBlobData) {
    if(profilePicdata) {
      let picData =  'data:image/jpeg;base64,'  + profilePicdata.picByte;
      this.profilePic.next(picData);
    }
  }
}
