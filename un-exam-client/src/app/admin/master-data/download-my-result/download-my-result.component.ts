import { Component, OnInit } from '@angular/core';
import { CourseType } from 'src/app/shared/constants/course.constant';
import { GradeUtil } from 'src/app/shared/grade-util';
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

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.results  = [];
  }

  results : any= [];
  downloadMyResult() {
    this.resultService.getMyResult(this.rollNumber, this.semistar).subscribe((res: any) => {
      this.results = res;
    });
  }

  getFullResult(examMarkList : any[]) : any{
    let total = 0;
    let f = true;
    for(let pr of examMarkList) {
      if(f) {
        f = false;
        continue;
      }
      if(this.checkForNumber(pr)) {
        total = total + (+pr);
      }
    }
    return total;
  }
  checkForNumber(num : any) {
    if(isNaN(+num)) {
      return false;
    } else {
      return typeof(+num) == 'number';
    }
  }
}
