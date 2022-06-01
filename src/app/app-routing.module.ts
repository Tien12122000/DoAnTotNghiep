import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { UnauthorizeComponent } from './admin/unauthorize/unauthorize.component';
import { RoutingAuthenticationService } from './core/routing-authentication.service';

const routes: Routes = [
  {path:'admin',loadChildren:()=>import("./admin/admin-module/admin-module.module").then(m=>m.AdminModuleModule), canActivate:[RoutingAuthenticationService]},
  // {path:'admin',loadChildren:()=>import("./admin/admin-module/admin-module.module").then(m=>m.AdminModuleModule)},
  {path:'Login',component: LoginComponent},
  {path:'Unauthorize',component: UnauthorizeComponent},
  {path:'', component:LoginComponent, pathMatch:'full'},
  // {path:'**', component:LoginComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
