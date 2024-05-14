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
  @Input("courseType") courseType : any;
  constructor() {}

  ngOnInit(): void {}

  getSelNoForMarksheet(result: any) {
    let examRoolNumber = result.examRoolNumber;
    if (examRoolNumber) {
      if (examRoolNumber.length > 5) {
        return (
          examRoolNumber.substring(0, examRoolNumber.length - 5) +
          '/' + this.examYearInput + '/' +
          examRoolNumber.substring(
            examRoolNumber.length - 3,
            examRoolNumber.length
          )
        );
      }
    }
    return '------------';
  }

  getGraceResultWithPercentage(result : any) {
    let grace = this.getGraceResult(result);
    if(grace) {
      return "Pass"
    } else {
      let per = (result.totalSecuredmark / result.totalMark) *100;
      if(per >= 50) {
        return "Pass With Distinction";
      } else {
        return "Pass";
      }
    }
  }

  getGraceResult(result : any) {
    let isGrace = false;
    console.log(result)
    if(result && result.semisterResults) {
      for(let semResult of  result.semisterResults) {
        if(semResult && semResult.sresult && semResult.sresult.results) {
          isGrace = isGrace || (semResult.sresult.results).some((e : any) => e.grace);
        }
      }
    }
    return isGrace;
  }
}
