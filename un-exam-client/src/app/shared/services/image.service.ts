import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private IMAGE_URL = "image"
  constructor(private apiService : ApiService) { }

  upload(event:any) {
    let imagedata = event.files[0];
    const uploadImageData = new FormData();
    uploadImageData.append(
      'imageFile',
      imagedata,
      imagedata.name
    );

    return this.apiService
      .post(`${this.IMAGE_URL}/upload`, uploadImageData);
  }

  delete(id:number){
    return this.apiService
    .delete(`${this.IMAGE_URL}/upload/`+id);
  }
}
