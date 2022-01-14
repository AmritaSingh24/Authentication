import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';
import { GuardGuard } from './authGuard/guard.guard';
import { DemoComponent } from './component/demo/demo.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    canActivate: [GuardGuard]
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'demo',
    component: DemoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
