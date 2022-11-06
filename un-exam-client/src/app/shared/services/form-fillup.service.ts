import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FormFillupService {
  constructor(private apiService: ApiService) {}

  URL = 'student-form';

  saveFormDetail(student : any, papers : any, examType : string, semistar : string) {
    let req = {
      student,
      papers,
      examType,
      semistar
    }
    return this.apiService.post(this.URL+"/save", req);
  }

  save(student: any) {
    return this.apiService.post(this.URL, student);
  }

  findAll() {
    return this.apiService.get(this.URL);
  }
  findAllFIlter(filter: any) {
    return this.apiService.post(this.URL + '/filter', filter);
  }

  validate(students: any[]) {
    let req = {
      students,
    };
    return this.apiService.post(this.URL + '/validate', req);
  }
  findByStudentDetails(student: any) {
    return this.apiService.post(this.URL + '/get-existing', student);
  }

  findByStudentDetailsForAdmitCard(student: any) {
    return this.apiService.post(this.URL + '/get-admit-card', student);
  }

  processStudentExcel(fileList: any, sessionId : number, courseType : string) {
    return this.apiService.postFile(this.URL+"/process-excel/"+sessionId+"/"+courseType, fileList);
  }
}
