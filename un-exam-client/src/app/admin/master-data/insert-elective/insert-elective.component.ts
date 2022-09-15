import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { ElectiveService } from 'src/app/shared/services/elective.service';

@Component({
  selector: 'app-insert-elective',
  templateUrl: './insert-elective.component.html',
  styleUrls: ['./insert-elective.component.css'],
})
export class InsertElectiveComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  examTypes = CourseType.examTypesIntORSEm;
  electives : any = [];

  studentModel: StudenModel = new StudenModel();

  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private electiveService : ElectiveService
  ) {}

  ngOnInit(): void {this.findAllSessions();}

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
    this.departmentService
      .findByStreamId(this.studentModel.stream?.id)
      .subscribe((res: any) => {
        this.departmentList = res;
      });

      this.getElectives();
  }

  getElectives() {
    if(this.studentModel.stream && this.studentModel.semistar) {
      this.electiveService
        .findElectivesByStreamId(this.studentModel.stream.id, this.studentModel.semistar)
        .subscribe((res: any) => {
          this.electives = res;
      });
    }
  }
}
