import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiResponse } from 'src/app/shared/model/api-response-model';
import { Department } from 'src/app/shared/model/department.model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SessionModel } from 'src/app/shared/model/session-model';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  
  session: SessionModel = new SessionModel();
  sessionList: SessionModel[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private sessionService: SessionService,
    private translateService: TranslateService

  ) { }

  ngOnInit(): void {
    this.reset();
    this.findAll();
  }
  edit(department: Department) {
    this.session = JSON.parse(JSON.stringify(department));
  }

  save() {
    if (this.session.id) {
      this.sessionService.update(this.session).subscribe((res: ApiResponse) => {
        this.toastService.sucess(res.sucessCode, this.translateService.instant(
          "usermanagement.department"
        ));
        this.findAll();
        this.reset();
      });
    } else {
      this.sessionService.create(this.session).subscribe((res: ApiResponse) => {
        this.findAll();
        this.toastService.sucess(res.sucessCode, this.translateService.instant(
          "usermanagement.department"
        ));
        this.reset();
      });
    }
  }

  reset() {
    this.session = new SessionModel();
  }
  findAll() {
    this.sessionService.findAll().subscribe((res: ApiResponse) => {
      this.sessionList = res.datas;
    });
  }

  delete(dept:any) {
    this.confirmationService.confirm({
      header: "Confirm",
      message: "Do you want to delete " + dept.name,
      accept: () => this.confirmDelete(dept),
    });
    this.reset();
  }

  confirmDelete(dept:any) {
    this.sessionService.delete(dept.id).subscribe((res: ApiResponse) => {
      this.toastService.sucess("DEPT","SUCESS DELETE");
      this.findAll();
    });
  }

}
