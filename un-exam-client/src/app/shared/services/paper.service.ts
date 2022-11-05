import { Injectable } from '@angular/core';
import { PaperModel } from '../model/paper.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaperService {

  url = 'paper';
  constructor(private apiService : ApiService) { }

  findAll() {
    return this.apiService.get(this.url);
  }

  findByHonoursAndSemistar(honoursId : number, semistar: string) {
    return this.apiService.get(`${this.url}/${honoursId}/${semistar}`);
  }

  findByHonoursAndSemistarAndSession(honoursId: any, semistar: any, session: any) {
    return this.apiService.get(`${this.url}/${honoursId}/${semistar}/${session}`);
  }

  findByHonoursAndSemistarAndSessionFormFillup(honoursId: any, semistar: any, session: any) {
    return this.apiService.get(`${this.url}/form-fillup/${honoursId}/${semistar}/${session}`);
  }

  create(model: PaperModel) {
    return this.apiService.post(this.url, model);
  }

  update(model: PaperModel) {
    return this.apiService.put(this.url, model);
  }

  delete(id: number) {
    return this.apiService.delete(`${this.url}/${id}`);
  }
}
