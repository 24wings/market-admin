import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DevService} from '../../../lib';
import {ParamType} from '../../../constant';


enum View{
  ListParams=1, 
  CreateParam,
  EditParam
}
@Component({
  selector: 'app-market-local-setting-page',
  templateUrl: './market-local-setting-page.component.html',
  styleUrls: ['./market-local-setting-page.component.css']
})
export class MarketLocalSettingPageComponent implements OnInit {
  newParam:IParam={
    paramKey:'',
    paramName:'',
    defaultValue:'',
    paramValue:'',
    type:ParamType.Text,
    addition:'',
  }
  dataSet:IParam[]=[];
  ParamType=ParamType
  View=View;
  state=View.ListParams;
  selectedParam:IParam;
  params:IParam[]=[];
  marketId:number;
  page:number=1;
  pageSize:number=10;
  total:number=10;
  constructor(public dev:DevService,public route:ActivatedRoute) { 
    this.marketId=this.route.snapshot.params.marketId;
  }

 async ngOnInit() {
   await this.listLocalParams();
  }
 async listLocalParams(){
  let result = await  this.dev.listLocalParams(this.marketId,this.page-1,this.pageSize);
  this.dataSet=result.rows;
  this.total=result.count;
  }
 async golbalParamCreate(){
   this.newParam.mktId=this.marketId;
   await this.dev.localParamCreate(this.newParam);
    await  this.listLocalParams();
  }
  async deleteParam(param:IParam) {
    await this.dev.paramDelete(param.id);
    await this.listLocalParams();
  }
  async paramUpdate(){
    await this.dev.paramUpdate(this.selectedParam);
    await this.listLocalParams();
  }
}
