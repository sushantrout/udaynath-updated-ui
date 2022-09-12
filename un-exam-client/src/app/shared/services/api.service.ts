import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  common_url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  get(url: string) : any{
    return this.http.get(`${this.common_url}${url}`);
  }
  post(url: string, body: any) : any{
    return this.http.post(`${this.common_url}${url}`, body);
  }

  put(url: string, body: any) : any{
    return this.http.put(`${this.common_url}${url}`, body);
  }

  delete(deleteIdURL: string) : any{
    return this.http.delete(`${this.common_url}${deleteIdURL}`);
  }

  upload(url: string, fileList: any) {
    return this.postFile(url, fileList);
  }

  postFile(path: string, fileList: any) {
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new HttpHeaders();
    return this.http.post(`${environment.api_url}${path}`, formData,
      { headers: headers, observe: 'response' });
  }
}
