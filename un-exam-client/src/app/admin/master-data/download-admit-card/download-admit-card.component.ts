import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { AdmitService } from 'src/app/shared/services/admit.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-download-admit-card',
  templateUrl: './download-admit-card.component.html',
  styleUrls: ['./download-admit-card.component.css'],
})
export class DownloadAdmitCardComponent implements OnInit {
  rollNumber: string = '';
  semistar: string = '';
  semistarList = CourseType.semistars;
  admitCardDetails:any;
  constructor(private admitService : AdmitService) {}

  ngOnInit(): void {
    this.admitCardDetails = null;
  }

  getAdmitCard() {
    this.admitService.download(this.rollNumber, this.semistar).subscribe((res : any) => {
      this.admitCardDetails = res;
    });
  }
}
