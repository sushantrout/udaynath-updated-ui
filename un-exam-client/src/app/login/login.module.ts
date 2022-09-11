import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { AppSharedModule } from '../shared/shared.module';
import { BipSharedModule } from '../shared/components/bip-shared/bip-shared.module';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes),
    BipSharedModule
  ]
})
export class LoginModule { }
