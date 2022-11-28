import { Injectable } from '@angular/core';
import { ResultInputModel } from '../model/result.input.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ResultService {


  url = 'result';
  constructor(private apiService: ApiService) {}

  save(body: ResultInputModel) {
    return this.apiService.post(this.url, body);
  }

  view(body: ResultInputModel) {
    return this.apiService.post(`${this.url}/view`, body);
  }

  getResultTemplate(requestBody: ResultInputModel) {
    return this.apiService.downloadFile(this.url + '/template', requestBody);
  }

  getResultByDepartment(requestBody: ResultInputModel) {
    return this.apiService.post(`${this.url}/by-department`, requestBody);
  }

  getMyResult(rollNumber: string, semistar : string) {
    return this.apiService.get(this.url+"/my-result/"+rollNumber+"/"+semistar);
  }

  updatestudentResult(req: { results: any; }) {
    return this.apiService.post(this.url+"/update/by-department", req);
  }

  delete(body: any) {
    return this.apiService.post(this.url+'/delete', body);
  }
}
