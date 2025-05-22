import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { GradeUtil } from 'src/app/shared/grade-util';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-result-pdf',
  templateUrl: './result-pdf.component.html',
  styleUrls: ['./result-pdf.component.css']
})
export class ResultPdfComponent implements OnInit {
  @Input('results') results!: any;
  @Input('studentModel') studentModel !: any;
  @Input('courseType') courseType !:string;

  gradeService = new GradeUtil();
  constructor(public commonService : CommonService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
  }
}
