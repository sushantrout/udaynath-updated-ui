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

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'session',
    component: SessionComponent,
  },
  {
    path: 'stream',
    component: StreamComponent,
  },
  {
    path: 'paper',
    component: PaperComponent,
  },
  {
    path: 'insert-honourse',
    component: InsertHonourseComponent,
  },
  {
    path: 'insert-elective',
    component: InsertElectiveComponent,
  },
  {
    path: 'mac',
    component: ManageAdmitCardComponent,
  },
  {
    path: 'dac',
    component: DownloadAdmitCardComponent,
  },
  {
    path: 'ddr',
    component: DownloadByDepartmentComponent,
  },
  {
    path: 'dmyr',
    component: DownloadMyResultComponent,
  },
  {
    path: 'manage-result',
    component: ManageDepartmentResultComponent,
  },
  {
    path: 'form-fillup',
    component: FormFillupComponent,
  },
  {
    path: 'manage-student',
    component: ManageStudentComponent,
  },
  {
    path: 'create-student',
    component: CreateStudentComponent,
  },
  {
    path: 'process-cnr',
    component: ProcessCnrComponent,
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
    ManageStudentComponent,
    CreateStudentComponent,
    ManageDepartmentResultComponent,
    ProcessCnrComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BipSharedModule,
    AppSharedModule,
  ],
  exports: [RouterModule],
})
export class MasterDataModule {}
