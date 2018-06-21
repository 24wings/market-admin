import { Component, OnInit } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions, TransferItem } from 'ng-zorro-antd';
import { RoleType, EmployeeType } from '../../../constant';
import { MenuType } from '../../../constant';
import { DevService, CommonService, StorageService } from '../../../lib';
import { ActivatedRoute } from '@angular/router';

enum View {
  List = 1,

  EmployeeCreate,
  EmployeeEdit

}
@Component({
  selector: 'app-group-company-employee-page',
  templateUrl: './group-company-employee-page.component.html',
  styleUrls: ['./group-company-employee-page.component.css']
})
export class GroupCompanyEmployeePageComponent implements OnInit {
  state: View = View.List;
  market: IMarket;
  newRole: IRole = {
    roleName: '',
    roleType: RoleType.GroupCompany,
    menuIds: []
  }
  
  marketId: number;
  newEmployee: IEmployee = {
    epName: '',
    epUserName: '',
    password: '',
    employeeType: EmployeeType.GroupCompany
  }
  showMenuTabIndex: number = 0;
  groups: IGroup[] = [];
  roleMenuGroups: IGroup[] = [];
  employees: IEmployee[] = [];
  menus: IMenu[] = [];
  groupCompany: IGroupCompany;
  isVisible: boolean = false;
  selectedOrg: IOrg;
  selectedEmployee: IEmployee;
  View = View;
  orgNodes: NzTreeNode[] = [];
  totalRoles: IRole[] = [];

  /**
   * isLeaf  false为组织 true为员工  组织可以点击获取组织员工
   * 
   */
  orgToTreeNode(org: IOrg): NzTreeNodeOptions {
    return { key: org.orgId + '', title: org.orgName, children: [], isLeaf: false, expanded: false,origin:org  } as any
  }
async  employeeUpdate(){
   await this.dev.employeeUpdate(this.selectedEmployee);
   await this.listTopOrgs();
  }
  employeeToTreeNodeOption(employee: IEmployee): NzTreeNodeOptions {
    return { title: employee.epName, key: employee.epId + '', children: [], isLeaf: true }
  }
  /**
   *  当点击时候
   */
  async  mouseAction(name: string, e: { eventName: 'expand', node: NzTreeNode, event: MouseEvent }) {
    console.log(name, e);
    /**点击组织 */
    if (!e.node.isLeaf) {
  
      if (e.node.key) {
        this.selectedOrg ={orgName:e.node.title,orgId:e.node.key as any};
        console.log('选中下级组织', e.node.origin);
       this.employees= await this.dev.employeeList(this.marketId,e.node.key as any);

     let subOrgs:IOrg[] =  await this.dev.orgList(this.marketId,e.node.key as any);
      e.node.children=[];
      e.node.addChildren(subOrgs.map(org=>this.orgToTreeNode(org)));
      
      }
      // 选择的是顶级组织 也就是市场
      else {
        console.log('选中顶级组织')
        this.selectedOrg={orgName:this.market.mktName,orgId:0};
        // 市场员工
        this.employees = await this.dev.employeeList(this.marketId, 0);
        let orgs = await this.dev.orgList(this.marketId, 0);
        this.orgNodes[0].children = [];
        this.orgNodes[0].addChildren(orgs.map(org => this.orgToTreeNode(org)));
        
      }
      
    }
    // 选中员工
    else {
      
    }
  }
  constructor(public dev: DevService, public common: CommonService, public storage: StorageService, public route: ActivatedRoute) {
    this.marketId = this.route.snapshot.params.marketId;
    
  }
  async listTopOrgs() {
    this.market = await this.dev.marketDetail(this.marketId);
    this.selectedOrg = { orgId: 0, orgName: this.market.mktName, };
    this.orgNodes = [new NzTreeNode({ title: this.market.mktName, children: [], key:  '', expanded: true })]
    this.employees = await this.dev.employeeList(this.marketId, 0);
    let orgs = await this.dev.orgList(this.marketId, 0);
    this.orgNodes[0].children = [];
    this.orgNodes[0].addChildren(orgs.map(org => this.orgToTreeNode(org)));
    // this.orgNodes[0].addChildren(employees.map(employee=>this.employeeToTreeNodeOption(employee)));
  }
  employeeRoles: TransferItem[] = [];
  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }
 async  employeeDelete(epId:number){
    await this.dev.employeeDelete(epId);
    await this.listTopOrgs();
  }
  change(ret: {}): void {
    console.log('nzChange', ret);
  }
  async  createEmployee() {
    this.newEmployee.marketId = this.marketId;
    this.newEmployee.orgId = this.selectedOrg.orgId;
    // console.log(this.employeeRoles);
    this.newEmployee.roleIds = (this.employeeRoles.filter(role => role.direction == 'left').map(role => role.key) as number[] );
    await this.dev.employeeCreate(this.newEmployee);
    await this.listTopOrgs();
  }
  epChange($event: { from: 'right' | 'left', list: TransferItem[], to: 'right' | 'left' }) {
    $event.list.forEach(item => item.direction = $event.to);
  }

  async ngOnInit() {
    await this.roleList();
    await this.listTopOrgs();
  }
  async roleList() {
    this.totalRoles = await this.dev.marketRoles(this.marketId);
    this.employeeRoles = this.totalRoles.map(role => this.roleToTransferItem(role));
  }
  roleToTransferItem(role: IRole): TransferItem {
    return { title: role.roleName, key: role.roleId + '', direction: 'right' };
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
