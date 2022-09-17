import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { ProcessExcelService } from 'src/app/shared/services/process-excel.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-process-cnr',
  templateUrl: './process-cnr.component.html',
  styleUrls: ['./process-cnr.component.css'],
})
export class ProcessCnrComponent implements OnInit {
  fileList!: any;
  headers = [];
  excelBodydatas: any[] = [];
  inputValue: string = '';
  sessions: SessionModel[] = [];
  sessionId: number = 0;
  courseType:string = "UG";
  courseTypes = CourseType.types

  constructor(
    private processExcelService: ProcessExcelService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.findAllSessions();
  }

  findAllSessions() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessions = res.datas;
    });
  }

  fileDataLoader(event: any) {
    this.fileList = event.target.files;
  }

  upload() {
    this.headers = [];
    this.excelBodydatas = [];
    this.processExcelService.processCNR(this.fileList, this.sessionId, this.courseType).subscribe((res: any) => {
      console.log(res);
    });
  }

  save() {}
}
