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
import { PaperService } from 'src/app/shared/services/paper.service';
import { PaperModel } from 'src/app/shared/model/paper.model';

@Component({
  selector: 'app-insert-honourse',
  templateUrl: './insert-honourse.component.html',
  styleUrls: ['./insert-honourse.component.css'],
})
export class InsertHonourseComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  studentModel: StudenModel = new StudenModel();
  examTypes = CourseType.examTypesIntORSEm;
  papers :PaperModel[] = [];
  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private paperService : PaperService
  ) {}

  ngOnInit(): void {
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
    this.departmentService
      .findByStreamId(this.studentModel.stream?.id)
      .subscribe((res: any) => {
        this.departmentList = res;
      });
  }

  getPapers() {
    if (this.studentModel.department && this.studentModel.semistar) {
      setTimeout(() => {
        this.paperService
          .findByHonoursAndSemistar(this.studentModel.department.id, this.studentModel.semistar)
          .subscribe((res: any) => {
            this.papers = res.filter((p : any) => p.paperType != "GE");
          });
      }, 1);
    }
  }
}
