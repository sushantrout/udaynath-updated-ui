import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';

@Component({
  selector: 'app-download-data-by-department',
  templateUrl: './download-data-by-department.component.html',
  styleUrls: ['./download-data-by-department.component.css'],
})
export class DownloadDataByDepartmentComponent implements OnInit, OnChanges {
  @Input('results') allResult!: any;
  @Input('studentModel') studentModel !: any;
  @Input('courseType') courseType !:string;
  @Input('examYearInput') examYearInput !:number;
  resultsAfterSplit : any = [];
  @Input('itemPerpage') itemPerpage !:number;

  gradeService = new GradeUtil();
  constructor() {}

  @Input('isCodeRequired') isCodeRequired = false;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(this.allResult && this.allResult.length != 0) {
      let index = -1;
      for(let i = 0; i< this.allResult.length; i++) {
        let rem = i % (this.itemPerpage || 5);
        if(rem  == 0) {
          index = index + 1;
          this.resultsAfterSplit[index] = [];
        }
        this.resultsAfterSplit[index].push(this.allResult[i]);
      }
    }
  }
}
