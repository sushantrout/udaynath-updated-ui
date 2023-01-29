import { Injectable } from '@angular/core';
import { ResultInputModel } from '../model/result.input.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CnrService {
  public URL = "process-cnr";

  constructor(private api : ApiService) { }

  downloadCNR(requestBody: ResultInputModel) {
    return this.api.downloadFile(this.URL, requestBody);
  }
}
