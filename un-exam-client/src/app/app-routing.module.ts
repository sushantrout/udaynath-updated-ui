import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadAdmitCardComponent } from './admin/download-admit-card/download-admit-card.component';
import { AuthGuard } from './shared/services/AuthGuard ';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/login'
  },
  {
    path: 'login',
    loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },{
    path:'download-admit-card',
    component: DownloadAdmitCardComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
