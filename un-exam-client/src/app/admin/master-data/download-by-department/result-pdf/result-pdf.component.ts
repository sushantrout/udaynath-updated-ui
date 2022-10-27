import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';

@Component({
  selector: 'app-result-pdf',
  templateUrl: './result-pdf.component.html',
  styleUrls: ['./result-pdf.component.css']
})
export class ResultPdfComponent implements OnInit {
  @Input('results') results!: any;
  @Input('studentModel') studentModel !: any;

  gradeService = new GradeUtil();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.results)
  }

  checkForNumber(num : any) {
    if(isNaN(+num)) {
      return false;
    } else {
      return typeof(+num) == 'number';
    }
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

}
