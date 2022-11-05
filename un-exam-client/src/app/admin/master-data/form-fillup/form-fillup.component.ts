import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { StudenModel } from 'src/app/shared/model/student.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { FormFillupService } from 'src/app/shared/services/form-fillup.service';
import { PaperService } from 'src/app/shared/services/paper.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-fillup',
  templateUrl: './form-fillup.component.html',
  styleUrls: ['./form-fillup.component.css'],
})
export class FormFillupComponent implements OnInit {
  selectedGender!: string;

  streams = [];
  years = [];
  semistars = CourseType.semistars;
  examTypes = CourseType.examTypesIntORSEm;
  courseTypes = CourseType.types;
  genders = CourseType.genders;
  casts = CourseType.casts;
  departments: any = [];
  preview: boolean = false;
  corepapers: any[] = [];
  ges: any[] = [];
  sec: any[] = [];
  compulsorys: any[] = [];
  dse: any[] = [];

  student: any = {};
  isSubmit: boolean = false;
  isRegistered: boolean = false;
  display = true;
  isOldRegistration = false;

  showForm = false;

  @ViewChild('registerForm') registerForm: any;

  userQuestionUpdate = new Subject<string>();
  constructor(
    private streamService: StreamService,
    private sessionService: SessionService,
    private formService: FormFillupService,
    private honourseService: DepartmentService,
    private paperService: PaperService,
    private messageService: ToastService,
    private studentService: StudentService
  ) {
    this.userQuestionUpdate.pipe(
      debounceTime(2000),
      distinctUntilChanged())
      .subscribe(value => {
        this.getApplicationForm();
      });
  }

  ngOnInit(): void {
    this.isOldRegistration = false;
    this.showForm = false;
    this.display = true;
    this.isRegistered = false;
    this.isSubmit = false;
    this.corepapers = [];
    this.dse = [];
    this.compulsorys = [];
    this.ges = [];
    this.sec = [];
    this.preview = false;
    this.student = {};
    this.streams = [];
    this.getAllStream();
    this.getYears();
    this.departments = [];
  }
  getYears() {
    this.sessionService.findAll().subscribe((res: any) => {
      this.years = res?.datas;
    });
  }

  getAllStream() {
    this.streamService.findAll().subscribe((res: any) => {
      this.streams = res.datas;
    });
  }

  togglePreviewButton() {
    this.isSubmit = true;
    let status =
      this.student.courseType &&
      this.student.semistar &&
      this.student.examType &&
      this.student.examYear &&
      this.student.examRoolNumber &&
      this.student.stream &&
      this.student.department &&
      this.student.fullName &&
      this.student.sex &&
      this.student.caste &&
      this.student.fathersName &&
      this.student.mothersName;
    if (status) {
      return true;
    } else {
      return false;
    }
  }
  printDoc() {
    window.print();
  }
  register() {
    if (!this.togglePreviewButton()) {
      return;
    }
    this.isRegistered = true;
    if (this.student.ges) {
      this.student.ges = { id: this.student.ges.id };
    }

    if (this.student.dse) {
      this.student.dse = { id: this.student.dse.id };
    }

    if (this.student.comp) {
      this.student.comp = { id: this.student.comp.id };
    }

    if (this.student.department) {
      this.student.department = { id: this.student.department.id };
    }

    this.formService.save(this.student).subscribe((res: any) => {
      this.messageService.sucess(
        'Your form is submitted successfully!',
        'Success'
      );
      this.showForm = true;
      this.preview = true;
    });
  }

  getDepartments() {
    if (this.student.stream) {
      this.honourseService
        .findByStreamId(this.student.stream)
        .subscribe((res: any) => {
          this.departments = res;
          this.getPaperByDepartment();
        });
    }
  }

  getPaperByDepartment() {
    this.corepapers = [];
    if (this.student.department && this.student.semistar && this.student.session && this.student.session.id) {
      this.paperService
        .findByHonoursAndSemistarAndSessionFormFillup(
          this.student.department,
          this.student.semistar,
          this.student.session.id
        )
        .subscribe((responses: any) => {
          this.corepapers = responses
            .filter((res: any) => res.paperType == 'CORE')
            .map((test: any) => test.name);
          this.sec = responses
            .filter((res: any) => res.paperType == 'SEC')
            .map((test: any) => test.name);
          this.compulsorys = responses.filter(
            (res: any) => res.paperType == 'COMPULSORY'
          );
          this.ges = responses.filter((res: any) => res.paperType == 'GE');
          this.dse = responses.filter((res: any) => res.paperType == 'DSE');
        });
    }
  }

  newRegister() {
    this.showForm = true;
    this.display = false;
  }
  getExisting() {
    this.display = false;
    this.isOldRegistration = true;
    /* this.showForm = true; */
  }

  cancelApplicationForm() {
    this.display = true;
    this.isOldRegistration = false;
  }

  getApplicationForm() {
    if(this.student && this.student.stream) {
      this.student.stream = {id : this.student.stream.id};
    }

    if(this.student && this.student.stream) {
      this.student.stream = {id : this.student.stream.id};
    }

    if(this.student && this.student.examYear) {
      this.student.examYear = { id : this.student.session.id};
    }

    let sem = this.student.semistar;
    let examType = this.student.examType;

    this.formService
      .findByStudentDetails(this.student)
      .subscribe((res: any) => {
        if (res && res.id) {
          this.student = res;
          this.student.stream = this.student.stream.id;
          this.student.department = this.student.department.id;
          this.student.semistar = sem;
          this.student.examType = examType;
          this.student.caste = this.toUpperCase(this.student.caste);
          this.display = false;
          this.isOldRegistration = false;
          if(this.student.dob) {
            this.student.dob = new Date(this.student.dob)
          }
          this.showForm = true;
          this.getDepartments();
        }
      });
  }

  toUpperCase(content : string) {
    if(content) {
      return (content+"").toUpperCase();
    } else {
      return content.toUpperCase();
    }
  }
}
