import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'admin'
  },{
    path: 'login',
    loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true, enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
