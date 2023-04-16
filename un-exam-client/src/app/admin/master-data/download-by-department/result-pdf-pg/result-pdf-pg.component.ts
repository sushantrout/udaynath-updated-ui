import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';

@Component({
  selector: 'app-result-pdf-pg',
  templateUrl: './result-pdf-pg.component.html',
  styleUrls: ['./result-pdf-pg.component.css'],
})
export class ResultPdfPgComponent implements OnInit {
  @Input('results') results!: any;
  @Input('studentModel') studentModel!: any;
  @Input('courseType') courseType!: string;
  @Input('resultPdfMarkSheet') resultPdfMarkSheet!:boolean;
  @Input('examYearInput') examYearInput !:number;

  gradeService = new GradeUtil();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.results);
  }

  getFullMarkCalculation(paperResult : any) {
    let resultList = [];
    resultList.push(paperResult.intFullMark);
    resultList.push(paperResult.semFullMark);
    resultList.push(paperResult.pracFullMark);
    return resultList.filter(d => d).join(" + ");
  }

  getSecuredMarkCalculation(paperResult : any) {
    let resultList = [];
    resultList.push(this.gradeService.getFormatedResult(paperResult.intMark));
    resultList.push(this.gradeService.getFormatedResult(paperResult.semMark));
    resultList.push(this.gradeService.getFormatedResult(paperResult.pracMark));
    return resultList.filter(d => d).join(" + ");
  }

  getSelNoForMarksheet(result : any, examRoolNumber: string, semistar : any) {
    if(examRoolNumber && semistar) {
      if(examRoolNumber.length > 5) {
        return examRoolNumber.substring(0, examRoolNumber.length-5) + "/" + semistar + "/" +
        this.examYearInput
        + "/"
         + examRoolNumber.substring(examRoolNumber.length-3, examRoolNumber.length);
      }
    }
    return "------------";
  }
}
