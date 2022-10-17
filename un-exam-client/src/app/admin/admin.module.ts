import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { BipSharedModule } from '../shared/components/bip-shared/bip-shared.module';
import { AppSharedModule } from '../shared/shared.module';

const route: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'master-data',
        loadChildren: () => import('./master-data/master-data.module').then(m => m.MasterDataModule)
      },
    ]
  },
];

@NgModule({
  declarations: [AdminComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    BipSharedModule,
    AppSharedModule
  ], exports: [
    RouterModule
  ]
})
export class AdminModule { }
