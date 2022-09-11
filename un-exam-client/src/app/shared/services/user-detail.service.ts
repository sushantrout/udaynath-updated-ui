import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  private URL = "user";

  constructor(private apiService: ApiService) { }

  findAll() {
    return this.apiService.get(this.URL);
  }

  create(user: User) {
    return this.apiService.post(this.URL, user);
  }

  update(user: User) {
    return this.apiService.put(this.URL, user);
  }

  delete(id: any) {
    return this.apiService.delete(this.URL + "/" + id);
  }
  enableUser(user: User) {
    let url = this.URL + "/enable";
    return this.apiService.post(url, user);
  }
  disableUser(user: User) {
    let url = this.URL + "/disable";
    return this.apiService.post(url, user);
  }
}
