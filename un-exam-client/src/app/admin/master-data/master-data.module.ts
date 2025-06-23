import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { BipSharedModule } from 'src/app/shared/components/bip-shared/bip-shared.module';
import { AppSharedModule } from 'src/app/shared/shared.module';
import { MasterDataComponent } from './master-data.component';
import { SessionComponent } from './session/session.component';
import { StreamComponent } from './stream/stream.component';
import { PaperComponent } from './paper/paper.component';
import { InsertHonourseComponent } from './insert-honourse/insert-honourse.component';
import { InsertElectiveComponent } from './insert-elective/insert-elective.component';
import { ManageAdmitCardComponent } from './manage-admit-card/manage-admit-card.component';
import { DownloadAdmitCardComponent } from './download-admit-card/download-admit-card.component';
import { DownloadByDepartmentComponent } from './download-by-department/download-by-department.component';
import { DownloadMyResultComponent } from './download-my-result/download-my-result.component';
import { ManageDepartmentResultComponent } from './manage-department-result/manage-department-result.component';
import { FormFillupComponent } from './form-fillup/form-fillup.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ProcessCnrComponent } from './process-cnr/process-cnr.component';
import { NgxPrintModule } from 'ngx-print';
import { DownloadDataByDepartmentComponent } from './download-by-department/download-data-by-department/download-data-by-department.component';
import { ManageDepartmentResultGridComponent } from './manage-department-result/manage-department-result-grid/manage-department-result-grid.component';
import { ResultPdfComponent } from './download-by-department/result-pdf/result-pdf.component';
import { DownloadAdmitCardByDeptComponent } from './download-admit-card-by-dept/download-admit-card-by-dept.component';
import { GuestGuardService } from 'src/app/shared/services/guest-guard.service';
import { ResultPdfPgComponent } from './download-by-department/result-pdf-pg/result-pdf-pg.component';
import { InsertValueEthComponent } from './insert-value-eth/insert-value-eth.component';
import { DownloadCnrComponent } from './download-cnr/download-cnr.component';
import { ProvisionalComponent } from './provisional/provisional.component';
import { ProvisionalCertificateComponent } from './provisional/provisional-certificate/provisional-certificate.component';
import { BackFormFillupComponent } from './back-form-fillup/back-form-fillup.component';
import { UniversityResultComponent } from './university-result/university-result.component';
import { AbsResultComponent } from './abs-result/abs-result.component';

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'session',
    component: SessionComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'stream',
    component: StreamComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'paper',
    component: PaperComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'insert-honourse',
    component: InsertHonourseComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'insert-elective',
    component: InsertElectiveComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'insert-value-eth',
    component: InsertValueEthComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'mac',
    component: ManageAdmitCardComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'dac',
    component: DownloadAdmitCardComponent,
  },
  {
    path: 'dac-by-dept',
    component: DownloadAdmitCardByDeptComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'ddr',
    component: DownloadByDepartmentComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'dmyr',
    component: DownloadMyResultComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'manage-result',
    component: ManageDepartmentResultComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'form-fillup',
    component: FormFillupComponent,
  },
  {
    path: 'existing-form-fillup',
    component: FormFillupComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'back-from',
    component: BackFormFillupComponent,
  },
  {
    path: 'manage-student',
    component: ManageStudentComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'create-student',
    component: CreateStudentComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'process-cnr',
    component: ProcessCnrComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'download-cnr',
    component: DownloadCnrComponent,
    canActivate: [GuestGuardService],
  },
  {
    path: 'download-provisional',
    component: ProvisionalComponent,
    canActivate: [GuestGuardService],
  },
  {
    path:'university-result',
    component: UniversityResultComponent
  },
  {
    path: 'abs-result',
    component: AbsResultComponent
  },
  {
    path: 'total-result',
    loadChildren: () =>
      import('./total-sem-result/total-sem-result.module').then(
        (m) => m.TotalSemResultModule
      ),
  },
];

@NgModule({
  declarations: [
    DepartmentComponent,
    MasterDataComponent,
    SessionComponent,
    StreamComponent,
    PaperComponent,
    InsertHonourseComponent,
    InsertElectiveComponent,
    ManageAdmitCardComponent,
    DownloadAdmitCardComponent,
    DownloadByDepartmentComponent,
    DownloadMyResultComponent,
    FormFillupComponent,
    BackFormFillupComponent,
    ManageStudentComponent,
    CreateStudentComponent,
    ManageDepartmentResultComponent,
    ProcessCnrComponent,
    DownloadDataByDepartmentComponent,
    ManageDepartmentResultGridComponent,
    ResultPdfComponent,
    DownloadAdmitCardByDeptComponent,
    ResultPdfPgComponent,
    InsertValueEthComponent,
    DownloadCnrComponent,
    ProvisionalComponent,
    ProvisionalCertificateComponent,
    BackFormFillupComponent,
    UniversityResultComponent,
    AbsResultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BipSharedModule,
    AppSharedModule,
    NgxPrintModule,
  ],
  exports: [RouterModule],
})
export class MasterDataModule {}
