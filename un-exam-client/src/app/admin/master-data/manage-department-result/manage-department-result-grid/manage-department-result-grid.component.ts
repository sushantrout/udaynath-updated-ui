import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-manage-department-result-grid',
  templateUrl: './manage-department-result-grid.component.html',
  styleUrls: ['./manage-department-result-grid.component.css'],
})
export class ManageDepartmentResultGridComponent implements OnInit, OnChanges {
  @Input('results') inresult!: any;
  results!: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.results = JSON.parse(JSON.stringify(this.inresult));
  }

  getTotalResult(paperResult : any) {
    let intMark = +paperResult.intMark;
    let semMark = +paperResult.semMark
    let pracMark = +paperResult.pracMark
    let total = 0;
    if(intMark && (paperResult.intMark+"").length != 0 && !isNaN(intMark)) {
      total = total + intMark;
    }
    if(semMark && (paperResult.semMark+"").length != 0 && !isNaN(semMark)) {
      total = total + semMark;
    }
    if(pracMark && (paperResult.pracMark+"").length != 0 && !isNaN(pracMark)) {
      total = total + pracMark;
    }
    return total;

  }
}
