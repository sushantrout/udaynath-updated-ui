import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { FormFillupService } from 'src/app/shared/services/form-fillup.service';
import { ProcessExcelService } from 'src/app/shared/services/process-excel.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent implements OnInit {
  fileList!: any;
  sessions: SessionModel[] = [];
  streams: StreamModel[] = [];
  departmentList: Department[] = [];
  courseTypes = CourseType.types;
  semistarList = CourseType.semistars;
  paperTypeList = CourseType.paperTypes;
  studentDatas: StudenModel[] = [];
  studentModel: StudenModel = new StudenModel();

  constructor(
    private departmentService: DepartmentService,
    private sessionService: SessionService,
    private streamService: StreamService,
    private excelService: ProcessExcelService,
    private studentService : StudentService,
    private formService : FormFillupService,
    private toastService : ToastService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.findAllSessions();
  }
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
      this.getAllStudents();
  }

  save() {
    let saveStudentDetails: any = {};
    saveStudentDetails.students = this.studentDatas;
    //this.studentDatas.forEach(d => d.dob = this.getDate(new Date(d.dob)));
    saveStudentDetails.stream = this.studentModel.stream;
    saveStudentDetails.session = this.studentModel.session;
    saveStudentDetails.courseType = this.studentModel.courseType;
    saveStudentDetails.department = this.studentModel.department;
    this.studentService.saveAll(saveStudentDetails).subscribe(
      (res: any) => {
        this.studentDatas = res;
        this.toastService.sucess("Student", "Uploaded !!!");
      },
      (err: any): void => {
        console.error(err);
      }
    );
  }
  getDate(dob: Date): any {
    return dob
  }

  upload() {
    this.studentDatas = [];
    this.studentService.processStudentExcel(this.fileList,
       this.studentModel.session?.id,
       this.studentModel.courseType, this.studentModel.department?.id).subscribe((res: any) => {
      this.getAllStudents();
    });
  }
  reset() {
    this.studentModel = new StudenModel();
  }

  getDepartmentsByStreamId() {
    if(this.studentModel.stream) {
      this.departmentService
        .findByStreamId(this.studentModel.stream?.id)
        .subscribe((res: any) => {
          this.departmentList = res;
        });
        this.getAllStudents();
    }
  }

  fileDataLoader(event: any) {
    this.fileList = event.target.files;
  }

  getAllStudents() {

    let filter : any= {};
    filter.stream = this.studentModel.stream;
    filter.session = this.studentModel.session;
    filter.courseType = this.studentModel.courseType;
    filter.department = this.studentModel.department;

    if(filter.stream && filter.session && filter.courseType && filter.department) {
      this.studentService.findStudentBySessionCourseTypeDepartmentHonourse(filter).subscribe((resp :any)=> {
        for(let res of resp) {
          if(res.dob)
          res.dob =res.dob;
        }
        this.studentDatas = resp;
      });
    }
  }

  delete(i:number) {
    let selectedId = this.studentDatas[i].id;
    this.studentService.delete(selectedId).subscribe((res : any) => {
      this.getAllStudents();
    });
  }

  addNew() {
    if(this.studentDatas) {
      let student  : any = {};
      this.studentDatas.unshift(student);
    }
  }
}
