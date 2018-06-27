
import { Component, OnInit } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { EmpService, StorageService } from '../../../lib';
import { ActivatedRoute } from '@angular/router';

enum View {
  ListOrgs = 1,
  CreateOrg,
  EditOrg

}
@Component({
  selector: 'app-org-page',
  templateUrl: './org-page.component.html',
  styleUrls: ['./org-page.component.css']
})
export class OrgPageComponent implements OnInit {
  state = View.ListOrgs;
  View = View;
  newOrg: IOrg = { orgName: '' };
  dataSet: IOrg[] = [];
  editOrg: IOrg;
  org: IOrg;
  selectedOrg: IOrg;
  async createOrg() {

    await this.emp.orgCreate({ orgName: this.newOrg.orgName, marketId: this.market.mktId, parentId: this.selectedOrg.orgId || 0 });
    console.log("A")
    await this.listOrg();
  }
  market: IMarket;
  // marketId: number;
  employee: IEmployee;
  empId: number;
  mktId: number;
  constructor(public emp: EmpService, public route: ActivatedRoute, public store: StorageService) {
    this.employee = this.store.employee;
    this.mktId = this.employee.marketId;

  }
  async  updateOrg() {
    await this.emp.orgUpdate(this.editOrg);
    await this.listOrg();
  }
  async  employeeDetail() {
    // debugger
    this.employee = await this.emp.employeeDetail(this.employee.epId);


  }
  async orgDelete(orgId: number) {
    await this.emp.orgDelete(orgId);
    await this.listOrg();
  }
  async  editOrging(orgId: number) {
    this.editOrg = await this.emp.orgDetail(orgId);
    this.market = await this.emp.marketDetail(this.employee.marketId);
    if (this.editOrg.parentId == 0) {
      // if(!parent){parent={orgName:this.market.mktName}}
      this.editOrg.parentName = this.market.mktName

    } else {
      let parent: IOrg = await this.emp.orgDetail(this.editOrg.parentId);
      this.editOrg.parentName = parent.orgName;

    }

    this.state = View.EditOrg;
  }

  async   listOrg() {
    this.market = await this.emp.marketDetail(this.employee.marketId);
    if (this.employee.orgId) {
      this.mouseAction('', { node: { key: this.org.orgId, title: this.org.orgName } } as any);
    } else {
      this.mouseAction('', { node: { key: this.employee.marketId, title: this.market.mktName } as any })

    }

  }
  orgNodes: NzTreeNode[] = [];


  async  mouseAction(name: string, e: { node: NzTreeNode }) {
    this.market = await this.emp.marketDetail(this.employee.marketId);
    let subOrgs: IOrg[] = await this.emp.orgList(this.market.mktId, e.node.key as any);
    this.dataSet = JSON.parse(JSON.stringify(subOrgs));


    if (e.node.key as any == 0) {
      e.node.children = [];
      e.node.addChildren(subOrgs.map(org => { return { key: org.orgId as any, title: org.orgName, children: [], origin: org, } }));

      return this.selectedOrg = { marketId: 0, orgName: this.market.mktName };
    } else {
      this.selectedOrg = await this.emp.orgDetail(e.node.key as any);
      this.dataSet.unshift(this.selectedOrg);
      console.log(this.dataSet);
      e.node.children = [];
      e.node.addChildren(subOrgs.map(org => { return { key: org.orgId as any, title: org.orgName, children: [], origin: org } }));

    }


  }
  async employeeOrg() {
    this.org = await this.emp.orgDetail(this.employee.orgId);

    /**不属于任何组织,直接属于市场 */
    if (!this.org) {
      console.log(this.employee.marketId)
      this.market = await this.emp.marketDetail(this.employee.marketId);
      this.orgNodes = [new NzTreeNode({ title: this.market.mktName, key: 0 + '', expanded: true })];

    } else {
      this.orgNodes = [new NzTreeNode({ title: this.org.orgName, key: this.org.orgId + '' })];
    }

  }

  async ngOnInit() {
    // this.mouseAction('', { node: { key: this.employee.marketId, title: this.market.mktName } as any })
    await this.employeeDetail();
    await this.employeeOrg();
    await this.listOrg();
  }

}
