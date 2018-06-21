import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { NzTreeNode } from 'ng-zorro-antd';
import { MenuType } from '../../../constant';
import { DevService, CommonService, StorageService } from '../../../lib';


enum ViewState {
  List = 1,
  Create,
  Update
}
@Component({
  selector: 'app-group-company-menu-manage-page',
  templateUrl: './group-company-menu-manage-page.component.html',
  styleUrls: ['./group-company-menu-manage-page.component.css']
})
export class GroupCompanyMenuManagePageComponent implements OnInit {

  gcId: number;
  marketId:number;
  showMenuTabIndex: number = 0;
  groups: IGroup[] = []
  menus: IMenu[] = [];
  market: IMarket;
  showTabGroups: IGroup[] = []
  optionParentMenus: IMenu[] = [];
  newMenuIds: number[];

  state: ViewState = ViewState.List;
  isExteralLink: boolean = false;
  ViewState = ViewState;


  isVisible: boolean = false;


  constructor(public dev: DevService, public common: CommonService, public storage: StorageService,public route:ActivatedRoute) {
    
  }

  async ngOnInit() {
    this.marketId = this.route.snapshot.params.marketId
    await this.getMenuList();
  }

  async  getMenuList() {
    let result = await this.dev.marketMenuList();
    this.market = await this.dev.marketDetail(this.marketId);
    this.menus = result.menus;
    console.log(result);
    this.menus.forEach(menu => { 
      menu.checked = (this.market.menuIds as number[]).some(gcMenuId => gcMenuId + '' == menu.menuId + '');
      menu.label = menu.link; 
    })
    this.groups = this.common.getModuleGroup(this.menus);
    this.groups.forEach(group => group.allChecked = false);
  }
  async updateGroupCompanyMenus() {
   
    let marketMenuIds = [];
    this.groups.forEach(group => {
      if (group.checked || group.indeterminate) {
        marketMenuIds.push(group.menuId);
        if (group.children ) {
          group.children.forEach(menu => {
         if(menu.checked)   marketMenuIds.push(menu.menuId);
          })
        }
      }
    })
    await this.dev.marketUpdate({ menuIds:marketMenuIds,mktId:this.marketId as any});
    await this.getMenuList();
  }

  updateAllChecked(group): void {
    group.indeterminate = false;
    if (group.children.every(group => group.checked)) {
      group.children.forEach(item => (item.checked = false));
      group.checked = false;
    } else {
      group.children.forEach(item => (item.checked = true));
      group.checked = true;
    }
  }

  updateSingleChecked(group: IGroup): void {
    if (
      group.children.every(group => group.checked) ||
      group.children.every(group => !group.checked)
    ) {
      group.checked = group.children.every(child => child.checked);
      group.indeterminate = false;
    } else {
      group.indeterminate = true;
    }
  }
}


