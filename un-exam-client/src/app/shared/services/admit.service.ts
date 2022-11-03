import { Injectable } from '@angular/core';
import { StudenModel } from '../model/student.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdmitService {

  public URL = "admit-card";
  constructor(private apiService : ApiService) { }

  download(examRollNumber:string, semister : string) {
    return this.apiService.get(`${this.URL}/${examRollNumber}/${semister}`);
  }

  downloadByDepartment(studentModel: StudenModel) {
    return this.apiService.post(`${this.URL}/by-department`, studentModel);
  }

}
