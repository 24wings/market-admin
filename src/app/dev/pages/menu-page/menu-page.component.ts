import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
import { MenuType } from '../../../constant';
import { DevService, CommonService } from '../../../lib';


enum ViewState {
  List = 1,
  Create,
  EditGroup,
  EditMenu
}
@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  showMenuTabIndex: number = 0;
  selectedMenu: IMenu;
  selectedGroup: IGroup
  tabs = [
    {
      active: true,
      name: '组织',
      icon: 'anticon anticon-apple'
    },
    {},

    {
      active: false,
      name: '开发者',
      icon: 'anticon anticon-android'
    }
  ];
  groups: IGroup[] = []
  menus: IMenu[] = [];
  showTabGroups: IGroup[] = []
  optionParentMenus: IMenu[] = [];

  state = ViewState.List;
  isExteralLink: boolean = false;
  ViewState = ViewState;
  externalOpenOptions: { label: string, value: string }[] = [
    { label: '新空白页', value: "_blank" },
    { label: '当前页', value: "_self" },
    { label: "父页面", value: "_parent", },
    { label: "顶级页面", value: "_top" }
  ]

  isVisible: boolean = false;
  menuTypeOptios: { label: string, value: number }[] = [
    { label: '市场', value: MenuType.Market },
    { label: '集团', value: MenuType.GroupCompany },
    { label: '平台开发者', value: MenuType.Develop }]
  newMenu: IMenu = {
    text: '默认菜单',
    target: '_blank',
    externalink: '',
    badgeDot: false,
    link: '/',
    menuType: MenuType.Develop,

    parentId: 0
  }
  constructor(public dev: DevService, public common: CommonService) { }

  ngOnInit() {
    this.getMenuList()
  }

  async  createMenu() {
    console.log(this.showMenuTabIndex);
    this.newMenu.externalink = this.isExteralLink ? this.newMenu.externalink : '';

    await this.dev.addMenu(this.newMenu);
    await this.getMenuList();

  }
  selectMenu(menu) {
    this.state = ViewState.EditMenu
    this.selectedMenu = menu;
    console.log(menu)
  }

  async  getMenuList() {
    let result = { menus: [] };
    switch (this.showMenuTabIndex) {
      case 0:
        result = await this.dev.marketMenuList();
        break;
      case 1:
        result = await this.dev.groupCompanyMenuList();
        break;
      case 2:
        result = await this.dev.devMenuList();
        break;
    }
    this.menus = result.menus;
    this.optionParentMenus = this.menus.filter(menu => menu.menuType == this.showMenuTabIndex + 1 && !menu.parentId);


    this.groups = this.common.getModuleGroup(this.menus);

  }
  async deleteMenu(menuId: number) {
    await this.dev.menuDelete(menuId);
    await this.getMenuList();

  }
  selectMenuGroup(group: IGroup) {
    this.selectedGroup = group;
    this.state = ViewState.EditGroup;
  }
  async  updateGroup() {
    await this.dev.menuUpdate({ menuId: this.selectedGroup.menuId, text: this.selectedGroup.text, icon: this.selectedGroup.icon });
    await this.getMenuList();
  }



  mouseAction(name: string, e: any): void {
    console.log(name, e);
  }
  showAddMenuModal() {
    console.log(`总菜单`, this.menus);
    this.state = ViewState.Create;
    console.log(`可选福记菜单`, this.optionParentMenus)
  }
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne.forEach(item => item.checked = true);
    } else {
      this.checkOptionsOne.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }
  async  updateMenu() {
    await this.dev.menuUpdate(this.selectedMenu);
    await this.getMenuList();

  }
}
