import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevService, CommonService } from '../../../lib';

enum View {
  ListRole,
  CreateRole = 1,
  EditRole
}
@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.css']
})
export class RolePageComponent implements OnInit {
  roles: IRole[] = [];
  marketId: number;
  newRole: IRole = {
    roleName: '',
    menuIds: [],
  }
  selectedRole: IRole
  totalMenus: IMenu[] = []
  indeterminate: boolean = false;

  groups: IGroup[] = [];

  state = View.ListRole;
  View = View;
  constructor(public route: ActivatedRoute, public dev: DevService, public common: CommonService) {
    this.marketId = this.route.snapshot.params.marketId;
  }
  dataSet: IRole[] = [
    { roleName: '', menuIds: [] }
  ];
  async selectRole(role: IRole) {
    this.selectedRole = role;
    this.groups.forEach(group => {
      if (role.menus.find(menu => menu.menuId == group.menuId)) {
        group.checked = true;
      }
      group.children.forEach(subMenu => {
        if (role.menus.find(menu => subMenu.menuId == menu.menuId)) {
          subMenu.checked = true;
        }
      })
    })
  }

  async  ngOnInit() {
    await this.listGroup();
    await this.listRoles();
  }
  async roleUpdate() {
    this.selectedRole.menuIds = this.common.getCheckedMenuIds(this.groups);
    this.selectedRole.marketId = this.marketId;
    await this.dev.roleUpdate(this.selectedRole);
    await this.listRoles();
    this.state = View.ListRole;

  }
  async  listRoles() {
    this.roles = await this.dev.marketRoles(this.marketId);
    this.roles.forEach(role => role.menus = this.common.menuIdsToMenus(role.menuIds as number[], this.totalMenus))
  }
  async  listGroup() {
    this.totalMenus = await this.dev.marketMenus(this.marketId);
    this.groups = this.common.getModuleGroup(this.totalMenus);
    console.log(this.groups);
  }
  async  createRole() {
    this.newRole.menuIds = this.common.getCheckedMenuIds(this.groups);

    this.newRole.marketId = this.marketId;
    await this.dev.roleCreate(this.newRole);
    await this.listRoles();
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
  async roleDelete(roleId) {
    await this.dev.roleDelete(roleId);
    await this.listRoles();
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
