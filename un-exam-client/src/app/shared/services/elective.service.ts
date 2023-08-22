import { Injectable } from '@angular/core';
import { ElectiveModel } from '../model/elective.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ElectiveService {




  url = 'elective';
  constructor(private apiService : ApiService) { }

  getHonerseByStream(streamId: number) {
    return this.apiService.get(`${this.url}/${streamId}`);
  }

  findAll() {
    return this.apiService.get(this.url);
  }

  findElectivesByStreamIdAnSessioId(sessionId : any, selectedStream: any, sem : string) {
    return this.apiService.get(`${this.url}/${sessionId}/${selectedStream}/${sem}`);
  }
  save(model: ElectiveModel) {
    return this.apiService.post(this.url, model);
  }

  delete(id: number) {
    return this.apiService.delete(`${this.url}/${id}`);
  }
}
