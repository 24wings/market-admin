import { Component, OnInit } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';
import { DevService } from '../../../lib';
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

  selectedOrg: IOrg;
  async createOrg() {
    
    await this.dev.orgCreate({ orgName: this.newOrg.orgName, marketId: this.marketId, parentId: this.selectedOrg.orgId ||0 });
    await this.listOrg();
  }
  market: IMarket;
  marketId: number;
  constructor(public dev: DevService, public route: ActivatedRoute) {
    this.marketId = this.route.snapshot.params.marketId;
  }
  async  updateOrg() {
    await this.dev.orgUpdate(this.editOrg);
    await this.listOrg();
  }
  async  marketDetail() {
    this.market = await this.dev.marketDetail(this.marketId);
    this.orgNodes = [new NzTreeNode({
      title: this.market.mktName,
      key: '0' as any,
      expanded: true,
      children: []
    })];
    this.selectedOrg = { parentId: 0, orgName: this.market.mktName,orgId:0 };
  }
  async orgDelete(orgId: number) {
    await this.dev.orgDelete(orgId);
    await this.listOrg();
  }
  async  editOrging(orgId: number) {
    this.editOrg = await this.dev.orgDetail(orgId);
    if (this.editOrg.parentId == 0) {
      // if(!parent){parent={orgName:this.market.mktName}}
      this.editOrg.parentName = this.market.mktName

    } else {
      let parent: IOrg = await this.dev.orgDetail(this.editOrg.parentId);
      this.editOrg.parentName = parent.orgName;

    }

    this.state = View.EditOrg;
  }

  async   listOrg() {

    await this.marketDetail();
    this.dev.marketDetail(this.marketId).then(res => {
      this.market = res;
    })
    let orgs: IOrg[] = await this.dev.orgList(this.marketId, 0);
    this.orgNodes[0].children = [];
    this.orgNodes[0].addChildren(orgs.map(org => {
      return {
        key: org.orgId as any, title: org.orgName, isLeaf: false,
        children: [], origin: org
      } as NzTreeNodeOptions
    }
    ));
  }
  orgNodes: NzTreeNode[] = [];
  async  mouseAction(name: string, e: { node: NzTreeNode }) {
    let subOrgs: IOrg[] = await this.dev.orgList(this.marketId, e.node.key as any);
    this.dataSet = JSON.parse(JSON.stringify(subOrgs));

      
    if (e.node.key as any == 0) {
      e.node.children = [];
      e.node.addChildren(subOrgs.map(org => { return { key: org.orgId as any, title: org.orgName, children: [], origin: org } }));

      return this.selectedOrg = { marketId: 0, orgName: this.market.mktName };
    } else {
      this.selectedOrg = await this.dev.orgDetail(e.node.key as any);
      this.dataSet.unshift(this.selectedOrg);
      console.log(this.dataSet);
      e.node.children = [];
      e.node.addChildren(subOrgs.map(org => { return { key: org.orgId as any, title: org.orgName, children: [], origin: org } }));

    }
  

  }

  async ngOnInit() {
    await this.listOrg();
  }
}
