import { Component, Input, OnInit } from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';

@Component({
  selector: 'app-download-all-sem-total',
  templateUrl: './download-all-sem-total.component.html',
  styleUrls: ['./download-all-sem-total.component.css'],
})
export class DownloadAllSemTotalComponent implements OnInit {

  gradeService = new GradeUtil();
  @Input("printResults") printResults : any;
  @Input("studentModel") studentModel : any;
  @Input("examYearInput") examYearInput : any;
  @Input("dateOfIssue") dateOfIssue : any;
  constructor() {}

  ngOnInit(): void {}

  getSelNoForMarksheet(result: any) {
    let examRoolNumber = result.examRoolNumber;
    if (examRoolNumber) {
      if (examRoolNumber.length > 5) {
        return (
          examRoolNumber.substring(0, examRoolNumber.length - 5) +
          '/1ST/' + this.examYearInput + '/' +
          examRoolNumber.substring(
            examRoolNumber.length - 3,
            examRoolNumber.length
          )
        );
      }
    }
    return '------------';
  }

  getDivision(totalMark : any, securedMark : any) {
    let percentage = this.getPercentage(totalMark, securedMark);
      if (percentage >= 60) {
          return 'First Class';
      } else if (percentage >= 50) {
          return 'Second Class';
      } else {
          return 'Fail';
      }
  }

  getPercentage(totalMark : any, securedMark : any) {
    return  (securedMark / totalMark) * 100;
  }
}
