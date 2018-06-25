import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { StorageComponent } from './com/storage/storage.component';
import zh from "@angular/common/locales/zh";
registerLocaleData(zh);
import { RouterModule, PreloadAllModules } from "@angular/router";
import { LibModule } from "./lib";
import { AppComponent } from "./app.component";
import { DevModule } from "./dev/dev.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
// import { HomePageComponent } from "./pages/home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DevLoginComponent } from './pages/dev-login/dev-login.component';
import { DbPageComponent } from './pages/tool/db-page/db-page.component';
import { TablePageComponent } from './pages/tool/table-page/table-page.component';
import { ToolPageComponent } from './pages/tool-page/tool-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    // HomePageComponent,
    DevLoginComponent,
    StorageComponent,
    DbPageComponent,
    TablePageComponent,
    ToolPageComponent

  ],

  imports: [
    // DevModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LibModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/admin/login", pathMatch: "full" },
      { path: "admin/login", component: LoginPageComponent },
      { path: "dev/login", component: DevLoginComponent },
      { path: 'admin/dev', loadChildren: 'app/dev/dev.module#DevModule', data: { preload: true } },
      { path: 'admin/employee', loadChildren: 'app/employee/employee.module#EmployeeModule', },
      // {path:'admin/dev/market',  loadChildren: 'app/dev/dev.module#DevModule',data:{preload:true}},

      // { path: "admin/signup", component: SignupPageComponent },
      // {
      //   path: "admin",
      //   component: HomePageComponent,
      //   children: [
      //     { path: "menu", component: MenuPageComponent },
      //     { path: 'dev/group-company', component: GroupCompanyPageComponent },
      //     {
      //       path: 'dev/market', component: GroupCompanyMainPageComponent, children: [
      //         { path: ':marketId/menu', component: GroupCompanyMenuManagePageComponent },
      //         { path: ':marketId/org', component: OrgPageComponent },
      //         { path: ":marketId/employee", component: GroupCompanyEmployeePageComponent },
      //         {path:':marketId/role',component:RolePageComponent},
      //         {
      //           path:':marketId/golbal-setting',
      //           component:MarketGolbalSettingPageComponent
      //         },
      //         {
      //           path:':marketId/local-setting',
      //           component:MarketLocalSettingPageComponent
      //         }
      //       ]
      //     },
      //     {
      //   path: 'tool', component: ToolPageComponent

      // },
      // {
      //   path: "tool/db/:dbId", component: DbPageComponent
      // },
      // {
      //   path: 'tool/db/:dbId/table', component: TablePageComponent
      // },

      //   ]
      // },

    ],
      //  { preloadingStrategy: PreloadAllModules }
    )
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }
