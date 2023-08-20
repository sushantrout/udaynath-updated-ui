import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { DownloadUTIL } from 'src/app/shared/download-util';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';

@Component({
  selector: 'app-university-result',
  templateUrl: './university-result.component.html',
  styleUrls: ['./university-result.component.css'],
})
export class UniversityResultComponent implements OnInit {
  sessions: SessionModel[] = [];
  studentModel: StudenModel = new StudenModel();
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  streams: StreamModel[] = [];
  streamId: any;
  sessionId: any;
  constructor(
    private sessionService: SessionService,
    private streamService: StreamService
  ) {}

  ngOnInit(): void {
    this.findAllSessions();
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

  downloadReport() {
    this,this.streamService.downloadUniversityReport(this.streamId?.id, this.sessionId?.id).subscribe((res: any) => {
      new DownloadUTIL().download(res);
    });
  }
}
