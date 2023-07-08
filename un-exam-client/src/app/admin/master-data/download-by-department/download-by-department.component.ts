import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { Department } from 'src/app/shared/model/department.model';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ResultInputModel } from 'src/app/shared/model/result.input.model';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-download-by-department',
  templateUrl: './download-by-department.component.html',
  styleUrls: ['./download-by-department.component.css'],
})
export class DownloadByDepartmentComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  studentModel: StudenModel = new StudenModel();

  resultPdf = false;
  resultPdfMarkSheet = false;
  examYearInput!:number;
  itemPerpage = 5;

  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private resultService: ResultService
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
    if(this.studentModel.courseType) {
      this.streamService
        .findByCourseType(this.studentModel.courseType)
        .subscribe((res: any) => {
          this.streams = res;
        });
    }
  }
  getDepartmentsByStreamId() {
    if(this.studentModel.courseType && this.studentModel.stream?.id) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
    }
  }

  downloadDetails = [];
  getResult(pdf = false, resultPdfMarkSheet = false) {
    this.resultPdf = pdf;
    this.resultPdfMarkSheet = resultPdfMarkSheet;
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session?.id;
    requestBody.semistar = this.studentModel.semistar;
    requestBody.streamId = this.studentModel.stream?.id;
    requestBody.departmentId = this.studentModel.department?.id;

    this.resultService
      .getResultByDepartment(requestBody)
      .subscribe((res: any) => {
        this.downloadDetails = res;
      });
  }


}
