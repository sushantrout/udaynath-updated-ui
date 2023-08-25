import { Component, OnInit } from '@angular/core';
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
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-total-sem-result',
  templateUrl: './total-sem-result.component.html',
  styleUrls: ['./total-sem-result.component.css']
})
export class TotalSemResultComponent implements OnInit {

  studentModel: StudenModel = new StudenModel();
  rollnumbers: any = [];
  examYearInput!: number;
  printResults: any = [];
  gradeService = new GradeUtil();
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  dateOfIssue !: string;
  isDetail = false;

  constructor(private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private resultService: ResultService,
    private toastService: ToastService,) { }

  ngOnInit(): void {
    this.isDetail = false;
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

  downloadDetails = [];
  getResult(detail = false) {
    this.isDetail = detail;
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
          this.getResultAnManage(res);
        });
    } else {
      this.resultService
        .getResultByDepartmentTotal(requestBody)
        .subscribe((res: any) => {
          this.getResultAnManage(res);
        });
    }
  }

  getResultAnManage(res: any) {
    this.rollnumbers = Object.keys(res);
    for (let rollNumber of this.rollnumbers) {
      let currentStudent = res[rollNumber];
      let semisters = Object.keys(currentStudent);

      let semisterResults = [];
      let totalMark = 0;
      let totalSecuredmark = 0;
      let totalGP = 0;
      let totalCP = 0;
      let isFail = false;
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
        totalSecuredmark = totalSecuredmark + this.gradeService.getTotal(semisterResult.sresult.uiResult);
        if(semisterResult.sresult.uiResult) {
          for(let ur of semisterResult.sresult.uiResult) {
            totalCP = totalCP + ur.cp;
            let gp = this.gradeService.creditPoint(ur,  this.studentModel.courseType || 'UG');
            if(gp) {
              totalGP = totalGP + (+gp);
            }
            if(gp == 0 || !gp) {
              isFail = true;
            }
          }
        }
      }

      let cgpa = totalGP / totalCP;
      let currentStudentResult = {
        rollNumber,
        semisterResults,
        totalMark,
        totalSecuredmark,
        cgpa,
        isFail
      };
      this.printResults.push(currentStudentResult);
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

  publish() {
    if(this.printResults) {
      let request = [];
      for(let result of this.printResults) {
        let rollNumber = result.rollNumber;
        let division = result.isFail ? "Fail" :  this.gradeService.getDivision(result.totalMark, result.totalSecuredmark);
        let grade = this.gradeService.getTotalGradePoint(result.totalMark, result.totalSecuredmark, (this.studentModel.courseType || 'UG'));
        request.push({
          examRoolNumber : rollNumber,
          grade,
          totalResult : division
        });
      }
      this.resultService.publish(request).subscribe((res: any) => {
        this.toastService.sucess("Result", "Published successfully")
      });
    }
  }
}
