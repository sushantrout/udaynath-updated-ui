import {
  Component,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { ResultService } from 'src/app/shared/services/result.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-manage-department-result-grid',
  templateUrl: './manage-department-result-grid.component.html',
  styleUrls: ['./manage-department-result-grid.component.css'],
})
export class ManageDepartmentResultGridComponent implements OnInit, OnChanges {
  @Input('results') inresult!: any;
  results!: any;

  @Output("refreshResult") refreshResult = new EventEmitter

  constructor(private resultService : ResultService,
    private toastService: ToastService,) {}

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

  updatestudentResult() {
    let req = {
      "results":this.results
    }
    this.resultService.updatestudentResult(req).subscribe((res : any) => {
      this.refreshResult.emit(true);
      this.toastService.sucess("Result", "Result updated!");
    }, (error : any) => {
      this.toastService.error("Result", "Please process again!");
    });
  }
}
