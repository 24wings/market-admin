import { NgModule, ModuleWithProviders } from "@angular/core";
import {HomePageComponent} from './pages/home-page/home-page.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from "@angular/router";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { CommonService, ConfigService, } from "./service";
// import { MoneyPipe, ArrTruePipe } from './pipe';
import { BackDirective, BgImgDirective } from "./directive";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImageViewerDirective } from "./directive/image-viewer.directive";

import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";


import { ContentTypeInterceptor } from "./service/http-interceptor";


import { DevService } from './service/dev.service';
import { MyHttpService } from "./service/http.service";
import { StorageService } from "./service/storage.service";


@NgModule({
  imports: [
    CommonModule,
    // BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    // NzPopconfirmDirective,

    BgImgDirective,
    BackDirective,
    ImageViewerDirective,HomePageComponent

  ],
  exports: [

    HttpModule,
    FormsModule,
    JsonpModule,

    BgImgDirective,
    BackDirective,
    ImageViewerDirective,
    HomePageComponent
    // NgZorroAntdModule,
    // NzPopconfirmDirective,


  ],
  providers: [
    ConfigService,
    CommonService,


    // MoneyPipe,
    // ArrTruePipe,
    BackDirective,
    BgImgDirective,
    ImageViewerDirective,
    MyHttpService,

    StorageService,


    DevService
  ]
})
export class LibModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
        ConfigService,
        CommonService,
        // MoneyPipe,
        // ArrTruePipe,
        BackDirective,
        BgImgDirective,
        ImageViewerDirective,


        MyHttpService,

        StorageService,


        DevService,
        HomePageComponent
      ]
    };
  }
}
