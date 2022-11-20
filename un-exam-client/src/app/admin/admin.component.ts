import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user.model';
import { CommonService } from '../shared/services/common.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();
  userImage!:any;
  loginsucess = false;
  constructor(private userService: UserService,
    private commonService  : CommonService) {
      this.userImage = this.commonService.profilePic.asObservable();
  }

  ngOnInit(): void {
    console.log("App init()");
    setTimeout(() => {
      this.loadScript();
    }, 10);
    this.user = this.commonService.currentUser;
    setTimeout(() => {
      this.loginsucess = this.user && this.userService.loginSucess;
    }, 10);
  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/plugins/sidemenu/sidemenu.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
}
