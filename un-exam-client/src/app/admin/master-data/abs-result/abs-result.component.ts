import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { DownloadUTIL } from 'src/app/shared/download-util';
import { GradeUtil } from 'src/app/shared/grade-util';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { ResultInputModel } from 'src/app/shared/model/result.input.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ResultService } from 'src/app/shared/services/result.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';

@Component({
  selector: 'app-abs-result',
  templateUrl: './abs-result.component.html',
  styleUrls: ['./abs-result.component.css'],
})
export class AbsResultComponent implements OnInit {
  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private resultService: ResultService
  ) {}

  gradeService: GradeUtil = new GradeUtil();
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  studentModel: StudenModel = new StudenModel();
  downloadDetails : any = [];
  examYearInput !:number
  downloadFileName: string = '';

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
    if (this.studentModel.courseType) {
      this.streamService
        .findByCourseType(this.studentModel.courseType)
        .subscribe((res: any) => {
          this.streams = res;
        });
    }
  }
  getDepartmentsByStreamId() {
    if (this.studentModel.courseType && this.studentModel.stream?.id) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
    }
  }

  getResult() {
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
        this.download();
      });
  }

  download() {
    let downloadData = [];

    let completeDat = [this.studentModel.session?.name || '',
      this.studentModel.courseType || '',
      this.studentModel.stream?.name || '',
      this.studentModel.department?.name || '',
      this.studentModel.semistar || '',
      this.examYearInput  || ''
    ];

    for (let i = 0; i < this.downloadDetails.length; i++) {
      let result = this.downloadDetails[i];
      let totalCP = 0;

      let data = [...completeDat];
      if(result && result.uiResult) {
        data.push(result.examRoolNumber || '');
        data.push(result.reg || '');
        data.push(result.fullName || '');

        for(let paperResult of result.uiResult) {

          data.push(paperResult.paperType || '');
          data.push(paperResult.paperCode || '');
          data.push(paperResult.fullMark || '');
          data.push(paperResult.intMark || '');
          data.push(this.getMaxMark(paperResult.semMark, paperResult.bk1Mark, paperResult.bk2Mark) || '');
          data.push(paperResult.pracMark || '');
          data.push(paperResult.acqureTotalResult || '');

          let gp = this.gradeService.getGradePoint(paperResult, this.studentModel.courseType || 'UG');
          let cp = this.gradeService.creditPoint(paperResult, this.studentModel.courseType || 'UG');

          data.push(gp);
          data.push(cp);

          if (typeof cp === 'number' && !isNaN(cp)) {
            totalCP = totalCP + cp;
          }
        }
      }
      data.push((this.gradeService.getTotal(result.uiResult) || 0.0).toFixed(2));
      data.push((this.gradeService.sgpaDetail(result.uiResult, this.studentModel.courseType || 'UG') || 0.0).toFixed(2));
      data.push(totalCP);
      downloadData.push(data);
    }

    this.resultService.downlodResult(downloadData, this.downloadFileName  || (this.studentModel.department?.name +"-"+this.studentModel.session?.name)).subscribe((res : any) => {
      let du = new DownloadUTIL();
      du.download(res);
    });
  }

  getMaxMark(semMark?: string, bk1Mark?: string, bk2Mark?: string): string | null {
  try {
    const lSemMark = this.parseLongSafely(semMark);
    const lBk1Mark = this.parseLongSafely(bk1Mark);
    const lBk2Mark = this.parseLongSafely(bk2Mark);

    const maxMark = Math.max(lSemMark, lBk1Mark, lBk2Mark);
    return maxMark.toString();
  } catch (error) {
    console.error("Error while calculating max mark:", error);
    return '0';
  }
}

parseLongSafely(value?: string): number {
  if (value && value.trim() !== '') {
    const parsed = parseInt(value.trim(), 10);
    if (!isNaN(parsed)) {
      return parsed;
    }
    console.warn(`Invalid number format: ${value}`);
  }
  return 0;
}

}
