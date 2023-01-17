import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VEService {

  url = 'ethics-and-values';
  constructor(private apiService : ApiService) { }

  findVEBYSessionId(sessionId: number) {
    return this.apiService.get(`${this.url}/${sessionId}`);
  }
}
