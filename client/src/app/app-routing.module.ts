import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: DashboardComponent ,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent ,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
