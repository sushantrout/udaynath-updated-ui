import { Injectable } from '@angular/core';
import { ResultInputModel } from '../model/result.input.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  url = "result"
  constructor(private apiService : ApiService) { }

  save(body : ResultInputModel) {
    return this.apiService.post(this.url, body);
  }

  view(body : ResultInputModel) {
    return this.apiService.post(`${this.url}/view`, body);
  }
}
