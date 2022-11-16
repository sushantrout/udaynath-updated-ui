import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { PaperModel } from 'src/app/shared/model/paper.model';
import { Department } from 'src/app/shared/model/department.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { PaperService } from 'src/app/shared/services/paper.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css'],
})
export class PaperComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  paperModel: PaperModel = new PaperModel();
  departmentList: Department[] = [];
  paperList: PaperModel[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  paperTypeList = CourseType.paperTypes;

  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private departmentService: DepartmentService,
    private paperService: PaperService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.findAll();
    this.findAllSessions();
  }
  findAllSessions() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessions = res.datas;
    });
  }

  findStreamByCourseType() {
    this.streamService
      .findByCourseType(this.paperModel.courseType)
      .subscribe((res: any) => {
        this.streams = res;
      });
  }

  edit(paperModel: Department) {
    this.paperModel = JSON.parse(JSON.stringify(paperModel));
    this.findStreamByCourseType();
    this.getDepartmentsByStreamId();
  }

  save() {
    if (this.paperModel.id) {
      this.paperService
        .update(this.paperModel)
        .subscribe((res: ApiResponse) => {
          this.findAll();
          this.reset();
        });
    } else {
      this.paperService
        .create(this.paperModel)
        .subscribe((res: ApiResponse) => {
          this.findAll();
          this.reset();
        });
    }
  }

  reset() {
    this.paperModel = new PaperModel();
  }
  findAll() {
    this.paperService.findAll().subscribe((res: any) => {
      this.paperList = res;
    });
  }

  delete(dept: any) {
    this.confirmationService.confirm({
      header: 'Confirm',
      message: 'Do you want to delete ' + dept.name,
      accept: () => this.confirmDelete(dept),
    });
    this.reset();
  }

  confirmDelete(dept: any) {
    this.paperService.delete(dept.id).subscribe((res: ApiResponse) => {
      this.toastService.sucess('DEPT', 'SUCESS DELETE');
      this.findAll();
    });
  }

  getDepartmentsByStreamId() {
    if(this.paperModel && this.paperModel.streamId) {
      this.departmentService
        .findByStreamId(this.paperModel.streamId)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
    }
  }
}
