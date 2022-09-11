import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FormFillupService {
  constructor(private apiService: ApiService) {}

  URL = 'student-form';
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
}
