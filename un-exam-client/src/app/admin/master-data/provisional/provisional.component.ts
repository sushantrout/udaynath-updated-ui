import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { AdmitService } from 'src/app/shared/services/admit.service';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ProvisionalService } from 'src/app/shared/services/provisional.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';

@Component({
  selector: 'app-provisional',
  templateUrl: './provisional.component.html',
  styleUrls: ['./provisional.component.css'],
})
export class ProvisionalComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  studentModel: StudenModel = new StudenModel();
  departmentPlaceHolder = "";
  issueDate="";

  resultPdf = false;
  downloadDetails: any = [];
  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private provisionalService: ProvisionalService
  ) {}

  ngOnInit(): void {
    this.downloadDetails = [];
    this.findAllSessions();
  }

  findAllSessions() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessions = res.datas;
    });
  }

  findStreamByCourseType() {
    this.streamService
      .findByCourseType(this.studentModel.courseType)
      .subscribe((res: any) => {
        this.streams = res;
      });
  }
  getDepartmentsByStreamId() {
    if (this.studentModel.courseType && this.studentModel.stream?.id) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
    }
  }

  getProvisional() {
    this.downloadDetails = [];
    this.provisionalService
      .downloadByDepartment(this.studentModel)
      .subscribe((res: any) => {
        this.downloadDetails = res;
      });
  }
}
