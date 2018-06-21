import { Component } from '@angular/core';
import { CommonService } from './lib'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  async uploadImage() {
    let base64 = await this.common.selectFile();
    await this.common.uploadImage(base64);

  }
  constructor(public common: CommonService) {

  }
  title = 'app';
}
