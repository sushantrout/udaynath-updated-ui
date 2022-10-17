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
}
