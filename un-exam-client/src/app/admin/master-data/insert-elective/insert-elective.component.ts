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
    this.resultService.save(requestBody).subscribe(
      (res: any) => {
        this.toastService.sucess("Result", "Saved sucessfully");
      },
      (err: any) => {
        console.log('Plese save it again');
      }
    );
  }
}
