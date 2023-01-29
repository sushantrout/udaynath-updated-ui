import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { FormFillupService } from 'src/app/shared/services/form-fillup.service';
import { PaperService } from 'src/app/shared/services/paper.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StreamService } from 'src/app/shared/services/stream.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Location } from '@angular/common';

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
  examTypes = CourseType.examTypes;
  courseTypes = CourseType.types;
  genders = CourseType.genders;
  casts = CourseType.casts;
  departments: any = [];
  preview: boolean = false;
  corepapers: any[] = [];
  ges: any[] = [];
  sec: any[] = [];
  compulsorys: any[] = [];
  defaultPaper: any[] = [];
  valuesAndEthics: any =[];
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
    private location: Location
  ) {
    this.userQuestionUpdate
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((value) => {
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
    this.valuesAndEthics = [];
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
      this.student.session &&
      this.student.examRoolNumber &&
      this.student.stream &&
      this.student.department;
    if (status) {
      return true;
    } else {
      return false;
    }

    /*  let status =
      this.student.courseType &&
      this.student.semistar &&
      this.student.examType &&
      this.student.session &&
      this.student.examRoolNumber &&
      this.student.stream &&
      this.student.department &&
      this.student.fullName &&
      this.student.gender &&
      this.student.caste &&
      this.student.fathersName &&
      this.student.mothersName;
    if (status) {
      return true;
    } else {
      return false;
    } */
  }
  printDoc() {
    window.print();
  }

  getDepartmentName() {
    if (this.departments && this.student.department) {
      let dept: any = this.departments.find(
        (e: any) => e.id == this.student.department
      );
      return dept ? dept.name : '';
    }
    return '';
  }
  getStreamName() {
    if (this.student.stream) {
      let stream: any = this.streams.find(
        (e: any) => e.id == this.student.stream
      );
      return stream ? stream.name : '';
    }
  }

  register() {
    if (!this.togglePreviewButton()) {
      return;
    }
    this.isRegistered = true;
    this.showForm = true;
    this.preview = true;

    let rollNumber = this.student.rollNumber;
    let examRoolNumber = this.student.examRoolNumber;
    let reg = this.student.registrationNumber;
    let fullName = this.student.fullName;
    let fathersName = this.student.fathersName;
    let mothersName = this.student.mothersName;
    let dob = this.student.dob;
    let gender = this.student.gender;
    let caste = this.student.caste;
    let emailId = this.student.emailId;
    let contactNumber = this.student.contactNumber;

    let studentReq = {
      id: this.student.id,
      semistar: this.student.semistar,
      rollNumber,
      examRoolNumber,
      reg,
      fullName,
      fathersName,
      mothersName,
      dob,
      gender,
      caste,
      emailId,
      contactNumber
    };

    let papers: any = [];

    if (this.papers) {
      let corepapers = this.getPaperByType(this.papers, 'CORE');
      let defaultPorepapers = this.getPaperByType(this.papers, 'PAPER');
      let sec = this.getPaperByType(this.papers, 'SEC');

      corepapers.forEach((element: any) => {
        papers.push({ id: element.id });
      });

      defaultPorepapers.forEach((element: any) => {
        papers.push({ id: element.id });
      });

      sec.forEach((element: any) => {
        papers.push({ id: element.id });
      });

      if (this.student.comp) {
        papers.push({ id: this.student.comp.id });
      }

      if (this.student.ges) {
        papers.push({ id: this.student.ges.id });
      }

      if (this.student.dse) {
        papers.push({ id: this.student.dse.id });
      }

      if(this.valuesAndEthics) {
        this.valuesAndEthics.forEach((element : any) => {
          papers.push({ id: element.id });
        });
      }
    }

    this.formService
      .saveFormDetail(
        studentReq,
        papers,
        this.student.examType,
        this.student.semistar
      )
      .subscribe((res: any) => {
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

  papers = [];
  getPaperByDepartment() {
    this.papers = [];
    this.corepapers = [];
    this.ges = [];
    this.sec = [];
    this.compulsorys = [];
    this.valuesAndEthics = [];
    this.dse = [];

    if (
      this.student.department &&
      this.student.semistar &&
      this.student.session &&
      this.student.session.id
    ) {
      this.paperService
        .findByHonoursAndSemistarAndSessionFormFillup(
          this.student.department,
          this.student.semistar,
          this.student.session.id
        )
        .subscribe((responses: any) => {
          this.papers = responses;
          this.corepapers = this.getPaperByType(responses, 'CORE').map(
            (test: any) => test.name
          );
          this.sec = this.getPaperByType(responses, 'SEC').map(
            (test: any) => test.name
          );
          this.compulsorys = this.getPaperByType(responses, 'COMPULSORY');
          this.ges = this.getPaperByType(responses, 'GE');
          this.dse = this.getPaperByType(responses, 'DSE');
          this.defaultPaper = this.getPaperByType(responses, 'PAPER').map(
            (test: any) => test.name
          );
          this.valuesAndEthics = this.getPaperByType(responses, "VALUES AND ETHICS");
        });
    }
  }

  getPaperByType(responses: any, type: string) {
    return responses
      .filter((paper: any) => paper.paperType)
      .filter((res: any) => res.paperType.toUpperCase() == type);
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
    if (this.student && this.student.stream) {
      this.student.stream = { id: this.student.stream.id };
    }

    if (this.student && this.student.stream) {
      this.student.stream = { id: this.student.stream.id };
    }

    if (this.student && this.student.examYear) {
      this.student.examYear = { id: this.student.session.id };
    }

    let sem = this.student.semistar;
    let examType = this.student.examType;
    let examRoolNumber = this.student.examRoolNumber;

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
          if (this.student.dob) {
            this.student.dob = this.student.dob
          }
          this.showForm = true;
          this.getDepartments();
        } else {
          this.student = {};
          this.student.semistar = sem;
          this.student.examType = examType;
          this.student.examRoolNumber = examRoolNumber;
        }
      });
  }

  toUpperCase(content: string) {
    if (content) {
      return (content + '').toUpperCase();
    } else {
      return "";
    }
  }

  editForm() {
    this.preview = false;
    this.isRegistered = false;
  }

  back() {
    this.location.back();
  }
}
