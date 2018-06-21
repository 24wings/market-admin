import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { GroupCompanyPageComponent } from './pages/group-company-page/group-company-page.component';
import { MarketPageComponent } from './pages/market-page/market-page.component';
import { GroupCompanyMainPageComponent } from './pages/group-company-main-page/group-company-main-page.component';
import { GroupCompanyEmployeePageComponent } from './pages/group-company-employee-page/group-company-employee-page.component';
import { GroupCompanyMenuManagePageComponent } from './pages/group-company-menu-manage-page/group-company-menu-manage-page.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { LibModule } from '../lib';
registerLocaleData(zh);
import { HomePageComponent } from '../lib/pages/home-page/home-page.component';
import { OrgPageComponent } from './pages/org-page/org-page.component';
import { RolePageComponent } from './pages/role-page/role-page.component';


import { MarketMainNavComponent } from '../com/market-main-nav/market-main-nav.component';
import { MarketGolbalSettingPageComponent } from './pages/market-golbal-setting-page/market-golbal-setting-page.component';
import { MarketLocalSettingPageComponent } from './pages/market-local-setting-page/market-local-setting-page.component';

const routes: Routes = [
  // { path: '', redirectTo: '/menu' },
  // {
  //   path: "group-company", component: HomePageComponent, children: [
  //     { path: '', component: GroupCompanyPageComponent }
  //   ],
  // },
  // { path: '', redirectTo: '/admin/dev/menu', pathMatch: 'full' },
  // {path:'',resolve:{name:''},r},
  {
    path: "", component: HomePageComponent, children: [

      { path: '', component: MenuPageComponent },
      {
        path: "group-company", component: GroupCompanyPageComponent,
      },
      {
        path: 'market', component: GroupCompanyMainPageComponent, children: [
          { path: ':marketId/menu', component: GroupCompanyMenuManagePageComponent },
          { path: ':marketId/org', component: OrgPageComponent },
          { path: ":marketId/employee", component: GroupCompanyEmployeePageComponent },
          { path: ':marketId/role', component: RolePageComponent },
          {
            path: ':marketId/golbal-setting', component: MarketGolbalSettingPageComponent
          },
          {
            path: ':marketId/local-setting',
            component: MarketLocalSettingPageComponent
          }
        ]
      }
    ]
  },
  {
    path: 'menu', component: HomePageComponent, children: [
      { path: '', component: MenuPageComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    LibModule.forRoot()
  ],
  declarations: [
    MenuPageComponent,
    GroupCompanyPageComponent,
    MarketPageComponent,
    GroupCompanyMainPageComponent,
    GroupCompanyEmployeePageComponent,
    GroupCompanyMenuManagePageComponent,

    OrgPageComponent,
    RolePageComponent,
    MarketGolbalSettingPageComponent,
    MarketMainNavComponent,
    MarketGolbalSettingPageComponent,
    MarketLocalSettingPageComponent

  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevModule { }
