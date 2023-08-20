import { Injectable } from '@angular/core';
import { StreamModel } from '../model/stream.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StreamService {

  constructor(private api: ApiService) {}

  url = 'stream';

  create(session: StreamModel) {
    return this.api.post(this.url, session);
  }
  update(session: StreamModel) {
    return this.api.put(this.url, session);
  }

  delete(id: any) {
    return this.api.delete(this.url + '/' + id);
  }
  findAll() {
    return this.api.get(this.url);
  }

  findByCourseType(courseType: string) {
    return this.api.get(this.url+"/by-course/"+courseType);
  }

  downloadUniversityReport(id: any, sessionId : any) {
    return this.api.downloadFile(`university/download/${id}/${sessionId}`, null);
  }
}
