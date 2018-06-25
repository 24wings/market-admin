import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgPageComponent } from './pages/org-page/org-page.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../lib/pages/home-page/home-page.component';
import { LibModule } from '../lib';
import { RolePageComponent } from './pages/role-page/role-page.component';
import { EmpPageComponent } from './pages/emp-page/emp-page.component';
import { GlobalPageComponent } from './pages/global-page/global-page.component';
import { LocalPageComponent } from './pages/local-page/local-page.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";

registerLocaleData(zh);
@NgModule({
  imports: [
    CommonModule,

    NgZorroAntdModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    LibModule.forRoot(),

    RouterModule.forChild([
      {
        path: '', component: HomePageComponent, children
          : [
            { path: "emp", component: EmpPageComponent },
            { path: "role", component: RolePageComponent },
            { path: "org", component: OrgPageComponent },
            { path: "local", component: LocalPageComponent },
            { path: "global", component: GlobalPageComponent }
          ]
      }])
  ],
  declarations: [OrgPageComponent, RolePageComponent, EmpPageComponent, GlobalPageComponent, LocalPageComponent,]
  ,
})
export class EmployeeModule { }
