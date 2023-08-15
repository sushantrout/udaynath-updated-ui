import { Component, Input, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
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
  selector: 'app-download-all-sem-total',
  templateUrl: './download-all-sem-total.component.html',
  styleUrls: ['./download-all-sem-total.component.css'],
})
export class DownloadAllSemTotalComponent implements OnInit {
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  studentModel: StudenModel = new StudenModel();
  rollnumbers: any = [];
  examYearInput!: number;
  printResults: any = [];
  gradeService = new GradeUtil();

  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.downloadDetails = [];
    this.findAllSessions();
    this.getResult();
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

  downloadDetails = [];
  getResult(detail = false) {
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session?.id;
    requestBody.streamId = this.studentModel.stream?.id;
    requestBody.departmentId = this.studentModel.department?.id;
    this.printResults = [];
    if (detail) {
      this.resultService
        .getResultByDepartmentDetails(requestBody)
        .subscribe((res: any) => {
          this.downloadDetails = res;
        });
    } else {
      this.resultService
        .getResultByDepartmentTotal(requestBody)
        .subscribe((res: any) => {
          this.rollnumbers = Object.keys(res);
          for (let rollNumber of this.rollnumbers) {
            let currentStudent = res[rollNumber];
            let semisters = Object.keys(currentStudent);

            let semisterResults = [];
            let totalMark = 0;
            let totalSecuredmark = 0;
            let cgpa = 0;
            for (let semister of semisters) {
              let sresult: any = currentStudent[semister][0] || {};
              let totalResult = 0;
              for (let r of sresult.uiResult) {
                totalResult = totalResult + this.getFullMarkCalculation(r);
              }
              totalMark = totalMark + totalResult;
              let semisterResult = {
                semister,
                sresult,
                totalResult,
              };
              semisterResults.push(semisterResult);
              this.gradeService.sgpaDetail(
                semisterResult.sresult.uiResult,
                this.studentModel.courseType || 'UG'
              );
              totalSecuredmark =
                totalSecuredmark +
                this.gradeService.getTotal(semisterResult.sresult.uiResult);
            }
            let currentStudentResult = {
              rollNumber,
              semisterResults,
              totalMark,
              totalSecuredmark,
              cgpa,
            };
            this.printResults.push(currentStudentResult);
          }
        });
    }
  }

  getFullMarkCalculation(paperResult: any) {
    if (
      paperResult &&
      paperResult.paperType &&
      paperResult.paperType == 'VALUES AND ETHICS'
    ) {
      return 0;
    }
    return (
      (paperResult.intFullMark || 0) +
      (paperResult.semFullMark || 0) +
      (paperResult.pracFullMark || 0)
    );
  }

  getSelNoForMarksheet(result: any) {
    let examRoolNumber = result.examRoolNumber;
    if (examRoolNumber) {
      if (examRoolNumber.length > 5) {
        return (
          examRoolNumber.substring(0, examRoolNumber.length - 5) +
          '/1ST/' + this.examYearInput + '/' +
          examRoolNumber.substring(
            examRoolNumber.length - 3,
            examRoolNumber.length
          )
        );
      }
    }
    return '------------';
  }
}
