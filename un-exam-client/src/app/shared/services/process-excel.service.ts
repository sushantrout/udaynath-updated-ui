import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessExcelService {


  constructor(private apiService : ApiService) { }

  URL = "result/excel";
  process(arg0: any) {
    return this.apiService.upload(this.URL, arg0);
  }

  processCNR(arg0: any, sessionId : number, courseType : string) {
    return this.apiService.upload('process-cnr/by-session/'+sessionId+"/"+courseType, arg0);
  }
}
