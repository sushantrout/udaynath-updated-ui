import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser = new BehaviorSubject<User>(new User());
  loginSucess = false;

  constructor(private apiService: ApiService,
    public commonService : CommonService) { }

  login(user: User) : any{
    this.commonService.currentUser = user;
    return this.apiService.post("login", user);
  }
}
