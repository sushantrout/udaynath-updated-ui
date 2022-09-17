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
import { ProcessExcelService } from 'src/app/shared/services/process-excel.service';
import {
  ResultInputModel,
  ResultModel,
} from 'src/app/shared/model/result.input.model';
import { ResultService } from 'src/app/shared/services/result.service';

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
  papers: PaperModel[] = [];
  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private paperService: PaperService,
    private processExcelService: ProcessExcelService,
    private resultService: ResultService
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
          .findByHonoursAndSemistar(
            this.studentModel.department.id,
            this.studentModel.semistar
          )
          .subscribe((res: any) => {
            this.papers = res.filter((p: any) => p.paperType != 'GE');
          });
      }, 1);
    }
  }

  fileList!: any;
  headers = [];
  excelBodydatas: any[] = [];
  inputValue: string = '';

  fileDataLoader(event: any) {
    this.fileList = event.target.files;
  }

  upload() {
    this.headers = [];
    this.excelBodydatas = [];
    this.processExcelService.process(this.fileList).subscribe((res: any) => {
      let resBody = res.body;
      this.headers = resBody[0];
      let resBodyForShow = resBody.slice(1, resBody.length);
      resBodyForShow.forEach((element: any[]) => {
        let elem : any = {} ;
        elem.roll = element[0];
        elem.mark = element[1];
        
        this.excelBodydatas.push(elem);
      });
    });
  }

  save() {
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session.id;
    requestBody.semistar = this.studentModel.semistar;
    requestBody.streamId = this.studentModel.stream.id;
    requestBody.honoursId = this.studentModel.department.id;
    requestBody.paperId = this.studentModel.paper.id;
    requestBody.examType = this.studentModel.examType;
    let results: ResultModel[] = [];
    this.excelBodydatas.forEach((e) => {
      if (e.length == 2) {
        let result = new ResultModel();

        result.roll = e[0].value;
        result.mark = e[1].value;
        results.push(result);
      }
    });
    requestBody.results = results;
    this.resultService.save(requestBody).subscribe(
      (res: any) => {
        if (res.id) {
        } else {
        }
      },
      (err: any) => {
        console.log('Plese save it again');
      }
    );
  }
}
