import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  STUDENT_URL = "student";
  constructor(private apiService : ApiService) { }

  findStudentByRollnumber(rollNumber : string) {
    return this.apiService.get(this.STUDENT_URL+"/"+rollNumber);
  }

  saveAll(saveStudentDetails: any) {
    return this.apiService.post(this.STUDENT_URL+"/save-all", saveStudentDetails);
  }

  findStudentBySessionCourseTypeDepartmentHonourse(filter : any) {
    return this.apiService.post(this.STUDENT_URL+"/filter", filter);
  }
}
