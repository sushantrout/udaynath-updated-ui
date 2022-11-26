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
import { DownloadUTIL } from 'src/app/shared/download-util';
import { ToastService } from 'src/app/shared/services/toast.service';

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
    private resultService: ResultService,
    private toastService : ToastService
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
    if(this.studentModel.stream?.id) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
    }
  }

  getPapers() {
    if (this.studentModel.department && this.studentModel.semistar && this.studentModel.session.id) {
      setTimeout(() => {
        this.paperService
          .findByHonoursAndSemistarAndSession(
            this.studentModel.department.id,
            this.studentModel.semistar,
            this.studentModel.session.id
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
        let elem: any = {};
        elem.slNo = element[0];
        elem.roll = element[1];
        elem.mark = element[2];

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
    requestBody.departmentId = this.studentModel.department.id;
    requestBody.paperId = this.studentModel.paper.id;
    requestBody.examType = this.studentModel.examType;
    requestBody.results = this.excelBodydatas;

    let currentFullMrk = 0;
    let paper = this.studentModel.paper;
    if(requestBody.examType == 'INT') {
      currentFullMrk = paper.intMark;
      if(!paper.intMark) {
        this.toastService.error("Paper result is not inserted", "Check");
        return;
      }
    } else if(requestBody.examType == 'PRAC') {
      currentFullMrk = paper.pracMark;
      if(!paper.pracMark) {
        this.toastService.error("Paper result is not inserted", "Check");
        return;
      }
    } else {
      currentFullMrk = paper.semMark;
      if(!paper.semMark) {
        this.toastService.error("Paper result is not inserted", "Check");
        return;
      }
    }

    currentFullMrk = +(currentFullMrk)

    let present = false;
    if(this.excelBodydatas) {
      for(let result of this.excelBodydatas) {
        result.invalid = false;
        let mark = +(result.mark);
        if(!isNaN(mark) && !isNaN(currentFullMrk)) {
          if(mark > currentFullMrk) {
            result.invalid = true;
            present = true;
          }
        }
      }
    }

    if(present) {
      this.toastService.error("Please validate", "Student Result");
      return;
    }

    this.resultService.save(requestBody).subscribe(
      (res: any) => {
        this.toastService.sucess("Result", "Saved sucessfully");
      },
      (err: any) => {
        console.log('Plese save it again');
      }
    );
  }

  downLoadtemplate() {
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session.id;
    requestBody.semistar = this.studentModel.semistar;
    requestBody.streamId = this.studentModel.stream.id;
    requestBody.departmentId = this.studentModel.department.id;
    this.resultService.getResultTemplate(requestBody).subscribe((res : any) => {
      let du = new DownloadUTIL();
      du.download(res);
    });
  }
}
