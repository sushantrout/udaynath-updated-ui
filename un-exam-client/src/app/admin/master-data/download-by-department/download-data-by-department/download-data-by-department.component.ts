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
  @Input('results') results!: any;
  @Input('studentModel') studentModel !: any;

  gradeService = new GradeUtil();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.results)
  }
}
