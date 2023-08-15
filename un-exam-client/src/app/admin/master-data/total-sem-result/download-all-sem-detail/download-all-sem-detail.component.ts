import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';

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
  constructor() {}

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
}
