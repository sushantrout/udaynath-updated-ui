import { Injectable } from '@angular/core';
import { Department } from '../model/department.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  

  private URL = "department";

  constructor(private apiService: ApiService) { }

  findAll() {
    return this.apiService.get(this.URL);
  }

  create(department: Department) {
    return this.apiService.post(this.URL, department);
  }

  update(department: Department) {
    return this.apiService.put(this.URL, department);
  }

  delete(id: any) {
    return this.apiService.delete(this.URL + "/" + id);
  }

  findByStreamId(streamId: number) {
    return this.apiService.get(this.URL+"/"+streamId);
  }
}
