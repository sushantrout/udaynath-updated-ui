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
import { FormFillupService } from 'src/app/shared/services/form-fillup.service';
import { ResultInputModel } from 'src/app/shared/model/result.input.model';
import { MenuItem, SelectItem } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-manage-admit-card',
  templateUrl: './manage-admit-card.component.html',
  styleUrls: ['./manage-admit-card.component.css']
})
export class ManageAdmitCardComponent implements OnInit {

  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  examTypes = CourseType.examTypes;
  selectAll:boolean = false;

  eligiblesSelectButtons: SelectItem[] = [
    {
      label: 'Select All',
      value: true
    }, {
      label: 'Deselect All',
      value: false
    }
  ];
  eligibles : SelectItem [] = [{
    label: 'NO',
    value: false
  }, {
    label: 'YES',
    value: true
  }];
  studentModel: StudenModel = new StudenModel();

  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private formService: FormFillupService,
    private messageService: ToastService,
  ) {}

  ngOnInit(): void {this.findAllSessions();}

  findAllSessions() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessions = res.datas;
    });
  }

  findStreamByCourseType() {
    if(!this.studentModel.courseType) return;
    this.streamService
      .findByCourseType(this.studentModel.courseType)
      .subscribe((res: any) => {
        this.streams = res;
      });
  }
  getDepartmentsByStreamId() {
    if(!this.studentModel.stream) return;
    this.departmentService
      .findByStreamId(this.studentModel.stream?.id)
      .subscribe((res: any) => {
        this.departmentList = res;
      });
  }

  admitCarddatas = [];
  getAdmitcardByDepartment() {
    this.admitCarddatas = [];
    let requestBody = new ResultInputModel();
    requestBody.semistar = this.studentModel.semistar;
    requestBody.departmentId = this.studentModel.department?.id;
    requestBody.examType = this.studentModel.examType;
    requestBody.sessionId = this.studentModel.session?.id;

    if(requestBody.semistar && requestBody.departmentId && requestBody.examType) {
      this.formService.findAllFIlter(requestBody).subscribe((res : any) => {
        this.admitCarddatas = res;
      });
    }
  }

  validate() {
    this.formService.validate(this.admitCarddatas).subscribe((res : any ) => {
      this.messageService.sucess(
        'Form validated submitted successfully!',
        'Success'
      );
    }, (error : any) => {
      this.messageService.error(
        'Please check with admin!',
        'Fail'
      );
    });
  }

  selectAllDataManage() {
    if(this.admitCarddatas) {
      this.admitCarddatas.forEach((e : any) => e.isEligible = this.selectAll);
    }
  }
}
