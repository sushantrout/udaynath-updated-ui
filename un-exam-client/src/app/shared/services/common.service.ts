import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationBlobData } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public profilePic = new BehaviorSubject<any>(null);
  private principalSigneture: any = "assets/images/psi.jpg";
  private examControllerSigneture: any = "assets/images/exam-controller.jpg";
  currentUser: any;

  constructor() { }

  setProfilepic(profilePicdata : ApplicationBlobData) {
    if(profilePicdata) {
      let picData =  'data:image/jpeg;base64,'  + profilePicdata.picByte;
      this.profilePic.next(picData);
    }
  }

  setPrincipalSigneture(signeture: any) {
    this.principalSigneture = signeture || "assets/images/psi.jpg";
  }

  getPrincipalSigneture() {
    return this.principalSigneture;
  }

  setExamControllerSigneture(signeture: any) {
    this.examControllerSigneture = signeture || "assets/images/exam-controller.jpg";
  }

  getExamControllerSigneture() {
    return this.examControllerSigneture;
  }
}
