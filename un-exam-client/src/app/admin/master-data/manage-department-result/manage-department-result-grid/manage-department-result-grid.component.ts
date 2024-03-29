import {
  Component,
  OnInit,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ResultInputModel } from 'src/app/shared/model/result.input.model';
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

  @Input('studentModel') studentModel !: any;

  @Output("refreshResult") refreshResult = new EventEmitter

  constructor(private resultService : ResultService,
    private toastService: ToastService,
    private confirmationService : ConfirmationService) {}

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
    let requestBody = new ResultInputModel();
    requestBody.subjectType = this.studentModel.courseType;
    requestBody.educationType = this.studentModel.courseType;
    requestBody.sessionId = this.studentModel.session?.id;
    requestBody.semistar = this.studentModel.semistar;
    requestBody.streamId = this.studentModel.stream?.id;
    requestBody.departmentId = this.studentModel.department?.id;

    let newReq = [];
    for(let i=0; i< this.results.length; i++) {
      newReq.push(this.results[i]);
      if(i % 25 == 0) {
        let req = {
          "results":[...newReq],
          "studentModel": requestBody
        }
        newReq = [];
        this.resultService.updatestudentResult(req).subscribe((res : any) => {
          if(i == this.results.length - 1) {
            this.refreshResult.emit(true);
            this.toastService.sucess("Result", "Result updated!");
          }
        }, (error : any) => {
          this.toastService.error("Result", "Please process again!");
        });
      }
    }
    if(newReq && newReq.length != 0) {
      let req = {
        "results":[...newReq],
        "studentModel": requestBody
      }
      newReq = [];
      this.resultService.updatestudentResult(req).subscribe((res : any) => {
          this.refreshResult.emit(true);
          this.toastService.sucess("Result", "Result updated!");
      }, (error : any) => {
        this.toastService.error("Result", "Please process again!");
      });
    }
  }

  deleteResultConfirm(result: any, paperResult : any) {
    this.confirmationService.confirm({
      header: 'Delete',
      message: `Do you want to delete ${paperResult.paperText} result for ${result.examRoolNumber}?`,
      accept: () =>{
        this.deleteResult(result.examRoolNumber, paperResult);
      }
    });
  }

  deleteResult(examRollNumber: any ,paperResult : any) {
    if(paperResult) {
      let resultArray = [paperResult.semMarkId,
        paperResult.intMarkId,
        paperResult.bk1MarkId,
        paperResult.bk2MarkId,
        paperResult.pracMarkId
      ].filter(a => a);
      this.resultService.delete(examRollNumber, resultArray).subscribe((res : any) => {
        this.toastService.sucess("Result", `${paperResult.paperText} result deleted sucessfuly.`);
        this.refreshResult.emit(true);
      });
    }
  }
}
