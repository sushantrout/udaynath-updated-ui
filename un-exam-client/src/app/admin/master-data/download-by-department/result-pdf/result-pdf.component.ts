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
}
