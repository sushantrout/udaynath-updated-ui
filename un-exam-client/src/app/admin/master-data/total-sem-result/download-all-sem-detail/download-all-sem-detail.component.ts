import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-download-all-sem-detail',
  templateUrl: './download-all-sem-detail.component.html',
  styleUrls: ['./download-all-sem-detail.component.css'],
})
export class DownloadAllSemDetailComponent implements OnInit {
  gradeService = new GradeUtil();
  @Input('printResults') printResults: any;
  @Input('studentModel') studentModel: any;
  @Input('examYearInput') examYearInput: any;
  @Input("dateOfIssue") dateOfIssue : any
  @Input('isStar') isStar : boolean = false;
  @Input('isCode') isCode: boolean = false;
  constructor(public commonService : CommonService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

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
