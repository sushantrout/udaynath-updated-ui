import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { DownloadUTIL } from 'src/app/shared/download-util';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { ResultInputModel } from 'src/app/shared/model/result.input.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { CnrService } from 'src/app/shared/services/cnr.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';

@Component({
  selector: 'app-download-cnr',
  templateUrl: './download-cnr.component.html',
  styleUrls: ['./download-cnr.component.css'],
})
export class DownloadCnrComponent implements OnInit {
  sessions: SessionModel[] = [];
  studentModel: StudenModel = new StudenModel();
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  streams: StreamModel[] = [];

  constructor(
    private sessionService: SessionService,
    private streamService: StreamService,
    private resultService : CnrService
  ) {}

  ngOnInit(): void {
    this.findAllSessions();
  }

  getCNRReport() {
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session?.id;
    requestBody.semistar = this.studentModel.semistar;
    requestBody.streamId = this.studentModel.stream?.id;
    requestBody.departmentId = this.studentModel.department?.id;
    this.resultService.downloadCNR(requestBody).subscribe((res : any) => {
      let du = new DownloadUTIL();
      du.download(res);
    });
  }

  findStreamByCourseType() {
    if (this.studentModel.courseType) {
      this.streamService
        .findByCourseType(this.studentModel.courseType)
        .subscribe((res: any) => {
          this.streams = res;
        });
    }
  }

  findAllSessions() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessions = res.datas;
    });
  }
}
