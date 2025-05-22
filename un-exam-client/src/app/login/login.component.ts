import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { ApiService } from '../shared/services/api.service';
import { CommonService } from '../shared/services/common.service';
import { ToastService } from '../shared/services/toast.service';
import { UserService } from '../shared/services/user.service';
import { ApiResponse } from '../shared/model/api-response-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showLogin: boolean = true;
  showSignup: boolean = false;

  user: User = new User();
  constructor(
    private userService: UserService,
    private router: Router,
    private tostService: ToastService,
    private commonService: CommonService,
    private translateService: TranslateService,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadScript();
    this.showLogin = true;
    /* this.user.username = "admin";
    this.user.password = "Admin";
    this.login(); */
    this.activatedRoute.queryParamMap.subscribe(params => {
      let pS = params.get('psing');
      let ecs = params.get('ecsing');
      this.commonService.setPrincipalSigneture(pS);
      this.commonService.setExamControllerSigneture(ecs);
    });
  }

  login() {
    if (this.user) {
      this.userService.login(this.user).subscribe(
        (res: ApiResponse) => {
          this.tostService.sucess(
            'Login',
            'Welcom to Exam management system',
            this.translateService.instant('usermanagement.succeful')
          );
          this.userService.loggedInUser.next(this.user);
          this.userService.loginSucess = true;
          this.commonService.currentUser = JSON.parse(
            JSON.stringify(this.user)
          );
          this.commonService.setProfilepic(res.data.profile?.profilePic);
          this.router.navigateByUrl('admin');
        },
        (err: any) => {
          this.tostService.error('Login', 'Login fails');
          this.router.navigateByUrl('login');
        }
      );
    }
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
