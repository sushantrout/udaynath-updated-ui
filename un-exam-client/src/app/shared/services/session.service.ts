import { Injectable } from '@angular/core';
import { SessionModel } from '../model/session-model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  url = 'session';
  constructor(private api: ApiService) {}
  
 
  create(session: SessionModel) {
    return this.api.post(this.url, session);
  }
  update(session: SessionModel) {
    return this.api.put(this.url, session);
  }

  delete(id: any) {
    return this.api.delete(this.url + '/' + id);
  }

  findAll() {
    return this.api.get(this.url);
  }
}
