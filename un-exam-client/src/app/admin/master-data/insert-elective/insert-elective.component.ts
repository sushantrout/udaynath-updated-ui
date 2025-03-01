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
import { ProcessExcelService } from 'src/app/shared/services/process-excel.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { ResultInputModel, ResultModel } from 'src/app/shared/model/result.input.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { forkJoin } from 'rxjs';

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
    private electiveService : ElectiveService,
    private processExcelService: ProcessExcelService,
    private resultService: ResultService,
    private toastService : ToastService
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
    if(this.studentModel.stream?.id) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
        this.getElectives();
    }
  }

  getElectives() {
    if(this.studentModel.stream && this.studentModel.semistar) {
      this.electiveService
        .findElectivesByStreamIdAnSessioId(this.studentModel.session?.id,this.studentModel.stream.id, this.studentModel.semistar)
        .subscribe((res: any) => {
          this.electives = res;
          this.electives.forEach((p: any) => {
            p.nameWithCode = p.name + ' (' + p.code + ')';
          });
      });
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
    requestBody.paperId = this.studentModel.paper?.id;
    requestBody.examType = this.studentModel.examType;
    requestBody.results = this.excelBodydatas;
    requestBody.electiveId = this.studentModel.elective?.id;

    let currentFullMrk = 0;
    let paper : any = this.studentModel.paper;
    if(!paper) {
      paper = this.studentModel.elective;
    }
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

    //I want to send the requiest part by part
    let total = this.excelBodydatas.length;
    let start = 0;
    let part = 15;
    let end = part;
    let count = 0;
    let temp = [];
    let requests = [];
    while(count < total) {
      temp = this.excelBodydatas.slice(start, end);
      requestBody.results = temp;
      requests.push(this.saveResult(JSON.parse(JSON.stringify(requestBody))));
      start = end;
      end = end + part;
      count = count + part;
    }
    forkJoin(requests).subscribe(
      (res: any) => {
        this.toastService.sucess("Result", "Saved sucessfully");
      },
      (err: any) => {
        console.log('Plese save it again');
      }
    );
    setTimeout(() => {
      this.toastService.sucess("Result", "Saved sucessfully");
    });
  }

  saveResult(requestBody: ResultInputModel) {
    return this.resultService.save(requestBody);
  }

  downLoadtemplate() {

  }
}
