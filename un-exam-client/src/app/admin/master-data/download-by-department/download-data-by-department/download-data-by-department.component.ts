import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-download-data-by-department',
  templateUrl: './download-data-by-department.component.html',
  styleUrls: ['./download-data-by-department.component.css'],
})
export class DownloadDataByDepartmentComponent implements OnInit, OnChanges {
  @Input('results') results!: any;

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
