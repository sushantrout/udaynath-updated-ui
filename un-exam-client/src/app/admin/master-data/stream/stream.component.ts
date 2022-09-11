import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StreamService } from 'src/app/shared/services/stream.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CourseType } from 'src/app/shared/constants/course.constant';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  
  unstream: StreamModel = new StreamModel();
  streamList: StreamModel[] = [];
  courseTypes = CourseType.types;
  
  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private streamService: StreamService,
    private translateService: TranslateService

  ) { }

  ngOnInit(): void {
    this.reset();
    this.findAll();
  }
  edit(department: StreamModel) {
    this.unstream = JSON.parse(JSON.stringify(department));
  }

  save() {
    if (this.unstream.id) {
      this.streamService.update(this.unstream).subscribe((res: ApiResponse) => {
        this.findAll();
        this.reset();
      });
    } else {
      this.streamService.create(this.unstream).subscribe((res: ApiResponse) => {
        this.findAll();
        this.reset();
      });
    }
  }

  reset() {
    this.unstream = new StreamModel();
  }
  findAll() {
    this.streamService.findAll().subscribe((res: ApiResponse) => {
      this.streamList = res.datas;
    });
  }

  delete(dept:any) {
    this.confirmationService.confirm({
      header: "Confirm",
      message: "Do you want to delete " + dept.name,
      accept: () => this.confirmDelete(dept),
    });
    this.reset();
  }

  confirmDelete(dept:any) {
    this.streamService.delete(dept.id).subscribe((res: ApiResponse) => {
      this.toastService.sucess("DEPT","SUCESS DELETE");
      this.findAll();
    });
  }

}
