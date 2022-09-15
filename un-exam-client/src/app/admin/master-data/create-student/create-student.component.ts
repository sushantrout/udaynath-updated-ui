import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { SessionModel } from 'src/app/shared/model/session-model';
import { StreamModel } from 'src/app/shared/model/stream.model';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ProcessExcelService } from 'src/app/shared/services/process-excel.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { StudentService } from 'src/app/shared/services/student.service';

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
    private studentService : StudentService
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
    this.excelService.process(this.fileList).subscribe((res: any) => {
      let response = res.body;
      let skipFirstRow = true;
      for (let row of response) {
        if (skipFirstRow) {
          skipFirstRow = false;
          continue;
        }
        if (row.length == 10) {
          let student = new StudenModel();
          student.fullName = row[0];
          student.examRoolNumber = row[1];
          student.rollNumber = row[2];
          student.dob = this.getDate(row[3]);
          student.gender = row[4];
          student.caste = row[5];
          student.fathersName = row[6];
          student.mothersName = row[7];
          student.emailId = row[8];
          student.reg = row[9];
          this.studentDatas.push(student);
        }
      }
      this.studentDatas = JSON.parse(JSON.stringify(this.studentDatas));
    });
  }
  reset() {
    this.studentModel = new StudenModel();
  }

  getDepartmentsByStreamId() {
    this.departmentService
      .findByStreamId(this.studentModel.stream?.id)
      .subscribe((res: any) => {
        this.departmentList = res;
      });
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

    this.studentService.findStudentBySessionCourseTypeDepartmentHonourse(filter).subscribe((res :any)=> {
      this.studentDatas = res;
    });
  }

  
}
