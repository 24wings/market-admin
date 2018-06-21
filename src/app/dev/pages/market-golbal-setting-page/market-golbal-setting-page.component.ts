import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevService } from '../../../lib';
import { ParamType } from '../../../constant';


enum View {
  ListParams = 1,
  CreateParam,
  EditParam
}
@Component({
  selector: 'app-market-golbal-setting-page',
  templateUrl: './market-golbal-setting-page.component.html',
  styleUrls: ['./market-golbal-setting-page.component.css']
})
export class MarketGolbalSettingPageComponent implements OnInit {
  dataSet: IParam[] = [];
  total: number = 10;
  selectedParam:IParam
  newParam: IParam = {
    paramKey: '',
    paramName: '',
    defaultValue: '',
    paramValue: '',
    type: ParamType.Text,
    addition: '',
  }
  ParamType = ParamType
  View = View;
  state = View.ListParams;
  params: IParam[] = [];
  marketId: number;
  page: number = 1;
  pageSize: number = 10;
  constructor(public dev: DevService, public route: ActivatedRoute) {
    this.marketId = this.route.snapshot.params.marketId;
  }

  async ngOnInit() {
    await this.listGolbalParams();
  }
  async listGolbalParams() {
    let result = await this.dev.listGolbalParams(this.marketId, this.page - 1, this.pageSize);
    this.dataSet = result.rows;
    this.total = result.count;
  }
  async golbalParamCreate() {
    this.newParam.mktId = this.marketId;
    await this.dev.golbalParamsCreate(this.newParam);
    await this.listGolbalParams();
  }
  async deleteParam(param:IParam) {
    await this.dev.paramDelete(param.id);
    await this.listGolbalParams();
  }
  async paramUpdate(){
    await this.dev.paramUpdate(this.selectedParam);
    await this.listGolbalParams();
  }
}
