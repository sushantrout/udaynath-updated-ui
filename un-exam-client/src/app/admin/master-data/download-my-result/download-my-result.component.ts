import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { GradeUtil } from 'src/app/shared/grade-util';
import { CommonService } from 'src/app/shared/services/common.service';
import { ResultService } from 'src/app/shared/services/result.service';

@Component({
  selector: 'app-download-my-result',
  templateUrl: './download-my-result.component.html',
  styleUrls: ['./download-my-result.component.css'],
})
export class DownloadMyResultComponent implements OnInit {
  rollNumber: string = '';
  semistar: string = '';
  semistarList = CourseType.semistars;

  gradeService = new GradeUtil();

  constructor(private resultService: ResultService, public commonService : CommonService) {}

  ngOnInit(): void {
    this.results  = [];
  }

  results : any= [];
  downloadMyResult() {
    this.resultService.getMyResult(this.rollNumber, this.semistar).subscribe((res: any) => {
      this.results = res;
    });
  }
}
