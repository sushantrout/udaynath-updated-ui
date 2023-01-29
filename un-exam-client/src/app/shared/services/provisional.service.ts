import { Injectable } from '@angular/core';
import { StudenModel } from '../model/student.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProvisionalService {

  URL = "provisional"
  constructor(private apiService : ApiService) { }

  downloadByDepartment(studentModel: StudenModel) {
    return this.apiService.post(this.URL, studentModel);
  }

}
