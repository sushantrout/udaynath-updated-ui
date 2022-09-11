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

const routes: Routes = [
  {
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'session',
    component: SessionComponent,
  },{
    path: 'stream',
    component: StreamComponent
  },{
    path:'paper',
    component: PaperComponent
  }
];

@NgModule({
  declarations: [DepartmentComponent, MasterDataComponent, SessionComponent, StreamComponent, PaperComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BipSharedModule,
    AppSharedModule,
  ],
  exports: [RouterModule],
})
export class MasterDataModule {}
