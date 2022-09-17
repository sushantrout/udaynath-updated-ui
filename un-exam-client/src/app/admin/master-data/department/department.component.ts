import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  

  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  department: Department = new Department();
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  
  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private departmentService: DepartmentService,
    private sessionService : SessionService,
    private streamService : StreamService,

  ) { }

  ngOnInit(): void {
    this.reset();
    this.findAll();
    this.findAllSessions();
  }
  findAllSessions() {
    this.sessionService.findAll().subscribe((res : ApiResponse) => {
      this.sessions = res.datas;
    });
  }

  findStreamByCourseType() {
    this.streamService.findByCourseType(this.department.courseType).subscribe((res : any)=> {
      this.streams = res;
    });
  }

  edit(department: Department) {
    this.department = JSON.parse(JSON.stringify(department));
    this.findStreamByCourseType();
  }

  save() {
    if (this.department.id) {
      this.departmentService.update(this.department).subscribe((res: ApiResponse) => {
        this.findAll();
        this.reset();
      });
    } else {
      this.departmentService.create(this.department).subscribe((res: ApiResponse) => {
        this.findAll();
        this.reset();
      });
    }
  }

  reset() {
    this.department = new Department();
  }
  findAll() {
    this.departmentService.findAll().subscribe((res:any) => {
      this.departmentList = res;
    });
  }

  delete(dept:any) {
    this.confirmationService.confirm({
      header: "Confirm",
      message: "Do you want to delete " + dept.name,
      accept: () => this.confirmDelete(dept),
    });
    this.reset();
  }

  confirmDelete(dept:any) {
    this.departmentService.delete(dept.id).subscribe((res: ApiResponse) => {
      this.toastService.sucess("Department","SUCESS DELETE");
      this.findAll();
    });
  }

}
