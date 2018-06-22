import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgPageComponent } from './pages/org-page/org-page.component';
import {RouterModule} from '@angular/router';
import { HomePageComponent } from '../lib/pages/home-page/home-page.component';
import {LibModule} from '../lib';

@NgModule({
  imports: [
    LibModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      {path:'',component:HomePageComponent,}
    ])
  ],
  declarations: [OrgPageComponent,]
})
export class EmployeeModule { }
