import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { CommonService, MyHttpService, DevService } from "../../../lib";
import { Observable } from "rxjs";
enum ViewState {
  List = 1,
  Create,

  Update,
  
}
@Component({
  selector: 'app-group-company-page',
  templateUrl: './group-company-page.component.html',
  styleUrls: ['./group-company-page.component.css']
})
export class GroupCompanyPageComponent implements OnInit {
  loading: boolean = false;
  newMarket: IMarket = { mktName: '' };
  selectedMarket:IMarket;
  pageIndex = 1;
  pageSize = 10;
  selectedArticle: any;
  allChecked: boolean = false;
  indeterminate: boolean = false;
  ViewState = ViewState;
  groupCompanys: IGroupCompany[] = []

  fileList: any[] = [];
  previewImage = "";
  previewVisible = false;
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  dataSet: any[] = [];
  state = ViewState.List;
  total = 100;
  // 更新
  selectedArticleType: any;

  constructor(

    public common: CommonService,
    private msg: NzMessageService,
    public myHttp: MyHttpService,
    public dev: DevService

  ) { }

  ngOnInit() {
    this.listMarkets();
  }

  upload = async item => {
    let base64 = await this.common.convertFileToBase64(item.file);
    let result = await this.common.uploadImage(base64);
    this.fileList.push({ url: result.url, uid: result.id, status: "done" });

    return (
      Observable.of({}).subscribe(
        () => {
          let clearUpload = setTimeout(() => {
            let i = this.fileList.findIndex(file => file.status == "uploading");
            if (i >= 0) {
              this.fileList = this.fileList.filter(
                file => file.status != "uploading"
              );
              console.log(this.fileList);
              // clearInterval(clearUpload);
            }
          }, 1000);
          console.log(`success`, this.fileList);
        },
        () => {
          console.log(`error`);
        }
      ),
      () => {
        console.log("process");
      }
    );
  };
  nzData = async file => {
    return await this.common.convertFileToBase64(file);
  };

  beforeUpload = async item => {
    console.log(item);
    return false;
  };
  async listMarkets() {
    let result = await this.dev.marketPage(this.pageIndex - 1, this.pageSize);
    this.groupCompanys = result.rows;
    this.total = result.count

  }

  async deleteCompanyGroup(groupCompany: IGroupCompany) {
    await this.dev.groupCompanyDelete(groupCompany.gcId);
    await this.listMarkets();
  }


  async   marketCreate() {
    let data = await this.dev.marketCreate(this.newMarket);
    this.state = ViewState.List;
    await this.listMarkets();

  }
  async marketUpdate(){
    await this.dev.marketUpdate(this.selectedMarket);
    this.state = ViewState.List;
    await this.listMarkets();
  }


}
