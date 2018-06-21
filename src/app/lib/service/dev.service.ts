import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { StorageService } from './storage.service';
import { MenuType, RoleType } from '../../constant';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';
@Injectable()
export class DevService {


  api = {
    orgList: '/api/org/list',
    orgCreate: '/api/org/create',
    orgUpdate: '/api/org/update',
    orgDelete: '/api/org/delete',
    orgDetail: '/api/org/detail',
    dbList: '/api/db/list',
    dbCreate: '/api/db/create',
    dbUpdate: '/api/db/update',
    dbDelete: '/api/db/delete',
    tableList: '/api/table/list',
    tableCreate: '/api/table/create',
    tableUpdate: '/api/table/update',
    tableDelete: '/api/table/delete',
    tableDetail: "/api/table/detail",
    tableListByDbId: '/api/table/listByDbId',
    templateList: '/api/template/list',
    templateCreate: '/api/template/create',
    templateUpdate: '/api/template/update',
    templateDelete: '/api/template/delete',
    listParams:'/api/param/list',
    paramsCreate:'/api/param/create',
    paramsDelete:'/api/param/delete',
    paramUpdate:'/api/param/update',


    /**
     * 获取角色下的子角色 ?roleId&gcId
     */
    roleGcRoleChildren: '/api/role/gc-role-children',
    /**  ?employeeId  */
    groupCompanyEmployeeDetail: '/api/employee/gc-detail',

    /**
     * Post 
     * username ,password
     */
    login: '/dev/login',
    /**
     * 增加菜单
     */
    addMenu: "/api/menu/create",
    menuList: "/api/menu/list",
    menuUpdate: '/api/menu/update',
    menuDelete: '/api/menu/delete',
    groupCompanyCreate: '/api/group-company/create',
    groupCompanyPage: '/api/group-company/page',
    groupCompanyDelete: '/api/group-company/delete',

    getGoupCompanyDetail: '/api/group-company/detail',

    marketCreate: '/api/market/create',
    marketPage: '/api/market/page',
    marketDelete: '/api/market/delete',
    marketUpdate: '/api/market/update',
    marketDetail: '/api/market/detail',
    /**
     * 获取marketMenus
     */
    marketMenus: '/api/market/menus',



    /*** 集团角色列表   ?gcId */
    marketRoles: '/api/role/list',
    /*** 创建集团角色   ?gcId&roleId  body:IRole*/
    roleCreate: '/api/role/create',
    /*** 更新集团角色   ?gcId&roleId  body:IRole*/
    roleUpdate: '/api/role/update',
    /*** 删除集团角色   ?gcId&roleId */
    roleDelete: '/api/role/delete',
    /*** 集团角色的菜单列表   ?gcId&roleId */
    roleMenus: '/api/role/menus',
    /** 属于集团的角色下的员工   ?gcId&roleId  */
    groupCompanyRoleEmployees: '/api/group-company/role/employees',
    /* 集团的菜单列表  ?gcId*/
    groupCompanyMenu: "/api/group-company/menus",
    /** 创建集团员工   body:IEmployee */
    employeeCreate: '/api/employee/create',
    employeeUpdate: "/api/employee/update",
    /** 更新  body:IEmployee  */
    groupCompanyEmployeeUpdate: '/api/group-company/employee/update',
    /** 删除   ?gcId&employeeId */
    employeeDelete: "/api/employee/delete",

    /** 分页 ?gcId&page&pageSize */
    employeeList: "/api/employee/list",
    //: '/api/group-company/employee/page',
  }
  async paramDelete(id:number){
    return this.http.Get(this.api.paramsDelete,{params:{id}})
  }
  async paramUpdate(param:IParam){
    return this.http.Post(this.api.paramUpdate,param);
  }
 async golbalParamsCreate(param:IParam){
   param.isLocal=0 as any;
  return this.http.Post(this.api.paramsCreate,param)
  }
  async localParamCreate(param:IParam){
    param.isLocal=1 as any;
    return this.http.Post(this.api.paramsCreate,param);
  }
  /**
  * 获取marketMenus
  */
 async  marketMenus(mktId: number) {
    let result =await  this.http.Get(this.api.marketMenus, { params: { mktId } });
    return result.menus;
  }
  async listLocalParams(mktId:number,page:number=0,pageSize:number=10){
    let result = await  this.http.Get(this.api.listParams,{params:{isLocal:1,mktId,page,pageSize}});
    return result.params;
    }
  async listGolbalParams(mktId:number,page:number=0,pageSize:number=10){
  let result = await  this.http.Get(this.api.listParams,{params:{isLocal:0,mktId,page,pageSize}});
  return result.params;
  }
  async orgDetail(orgId: number) {
   let result = await  this.http.Get(this.api.orgDetail, { params: { orgId } });
   return result.org;
  }
  async orgDelete(orgId: number) {
    return this.http.Get(this.api.orgDelete, { params: { orgId } })
  }
  async  marketDetail(mktId: number) {
    let result = await this.http.Get(this.api.marketDetail, { params: { mktId } });
    if (!result.market.menuIds ) result.market.menuIds = [];
    if(typeof result.market.menuIds =='string') result.market.menuIds=result.market.menuIds.split(',')
    return result.market;
  }
 async  orgList(marketId: number, parentId: number) {
    let result =await  this.http.Get(this.api.orgList, { params: { marketId, parentId } });
    return result.orgs;
  }
 async  orgCreate(org: IOrg) {
    return this.http.Post(this.api.orgCreate, org)
  }
  orgUpdate(org: IOrg) {
    return this.http.Post(this.api.orgUpdate, org)
  }
  /** 集团的员工详情 */
  groupCompanyEmployeeDetail(gcId: number, epId: number) {
    return this.http.Get(this.api.groupCompanyEmployeeDetail, { params: { gcId, epId } })
  }
  roleGcRoleChildren(roleId: number, gcId: number) {
    return this.http.Get(this.api.roleGcRoleChildren, { params: { roleId, gcId } })
  }

  templateList() {
    return this.http.Get(this.api.templateList, { params: {} })
  }
  templateCreate(template: Template) {
    return this.http.Post(this.api.templateCreate, template)
  }
  templateUpdate(template: Template) {
    return this.http.Post(this.api.templateUpdate, template)
  }
  templateDelete(templateId: number) {
    return this.http.Get(this.api.templateDelete, { params: { templateId } })
  }

  tableList() {
    return this.http.Get(this.api.tableList);
  }
  tableListByDbId(dbId: number) {
    return this.http.Get(this.api.tableListByDbId, { params: { dbId } })
  }
  tableCreate(table: DbTable) {
    if (Array.isArray(table.cols)) table.cols = JSON.stringify(table.cols) as any;
    return this.http.Post(this.api.tableCreate, table)
  }
  tableUpdate(table: DbTable) {
    if (Array.isArray(table.cols)) {
      table.cols = JSON.stringify(table.cols) as any;
    }
    return this.http.Post(this.api.tableUpdate, table);
  }
  tableDelete(tableId: number) {
    return this.http.Get(this.api.tableDelete, { params: { tableId } });
  }
  tableDetail(tableId: number) {
    return this.http.Get(this.api.tableDetail, { params: { tableId } })
  }




  dbList() {
    return this.http.Get(this.api.dbList, { params: { devId: this.storage.dev.devId } })
  }
  dbUpdate(db: IDb) {
    return this.http.Post(this.api.dbUpdate, db);

  }
  /**创建数据库 */
  dbCreate(db: IDb) {
    db.devId = this.storage.dev.devId;
    return this.http.Post(this.api.dbCreate, db);
  }
  dbDelete(dbId: number) {
    return this.http.Get(this.api.dbList, { params: { devId: this.storage.dev.devId, dbId } });
  }


 async  employeeList(marketId: number, orgId: number) {
   let result = await   this.http.Get(this.api.employeeList, { params: { marketId, orgId } })
  return result.employees;
  }
  employeeDelete(epId: number) {
    console.log(epId);
    return this.http.Get(this.api.employeeDelete, { params: { epId } })
  }
  employeeUpdate(employee: IEmployee) {
    return this.http.Post(this.api.employeeUpdate, employee)
  }

  employeeCreate(employee: IEmployee) {
    if(Array.isArray(employee.roleIds))employee.roleIds=employee.roleIds.join(',');
    return this.http.Post(this.api.employeeCreate, employee)
  }
  // marketMenu(gcId: number) {
  // return this.http.Get(this.api.groupCompanyMenu, { params: { gcId } })
  // }
  groupCompanyRoleEmployees(gcId: number, roleId: number) {
    return this.http.Get(this.api.groupCompanyRoleEmployees, { params: { gcId, roleId } })
  }
  roleMenus(gcId: number, roleId: number) {
    return this.http.Get(this.api.marketRoles, { params: { gcId, roleId } })
  }
 async  roleCreate(role: IRole) {
    // role.roleType = RoleType.GroupCompany
    if (Array.isArray(role.menuIds)) role.menuIds = role.menuIds.join(',');
    let result =await this.http.Post(this.api.roleCreate, role);
    return result.menus;
  }
  roleUpdate(role: IRole) {
    if(Array.isArray(role.menuIds)) role.menuIds=role.menuIds.join(',');
    return this.http.Post(this.api.roleUpdate, role)
  }
  roleDelete(roleId: number) {
    this.http.Get(this.api.roleDelete, { params: { roleId } })
  }

async   marketRoles(marketId: number) {
    let result= await this.http.Get(this.api.marketRoles, { params: { marketId } });
     (result.roles as IRole[]).forEach((role:IRole)=>{
      if(typeof role.menuIds=='string'){
        role.menuIds=(role.menuIds.split(',') as any[])
      }

     });
     return result.roles;

  }

  marketCreate(market: IMarket) {
    return this.http.Post(this.api.marketCreate, market)
  }
  async  marketPage(page: number = 0, pageSize: number = 10) {
    let result = await this.http.Get(this.api.marketPage, { params: { page, pageSize } });
    return result.markets

  }
  marketDelete(mktId: number) {
    return this.http.Get(this.api.marketDelete, { params: { mktId } });
  }
  marketUpdate(market: IMarket) {
    if(Array.isArray(market.menuIds)) market.menuIds=(market.menuIds as number[]).join(',')
    return this.http.Post(this.api.marketUpdate, market)
  }

  groupCompanyCreate(groupCompany: IGroupCompany) {
    return this.http.Post(this.api.groupCompanyCreate, groupCompany);
  }
  groupCompanyPage(page: number = 0, pageSize = 10) {
    return this.http.Get(this.api.groupCompanyPage, { params: { page, pageSize } })
  }
  groupCompanyDelete(gcId: number) {
    return this.http.Get(this.api.groupCompanyDelete, { params: { gcId } });
  }

  devLogin(userName: string, password: string) {
    return this.http.Post(this.api.login, { userName, password });
  }
  addMenu(menu: IMenu) {
    menu.creatorId = this.storage.dev.devId;
    return this.http.Post(this.api.addMenu, menu);
  }

  private getMenuList(menuType: MenuType) {
    return this.http.Get(this.api.menuList, { params: { devId: this.storage.dev.devId, menuType } })
  }
  devMenuList() {
    return this.getMenuList(MenuType.Develop)
  }
  groupCompanyMenuList() {
    return this.getMenuList(MenuType.GroupCompany)
  }
  async marketMenuList() {
    return this.getMenuList(MenuType.Market)

  }
  menuUpdate(menu: IMenu) {
    return this.http.Post(this.api.menuUpdate, menu);
  }
  menuDelete(menuId: number) {
    return this.http.Get(this.api.menuDelete, { params: { menuId } })
  }
  getGroupCompanyByGcId(gcId: number) {
    // alert(gcId)
    return this.http.Get(this.api.getGoupCompanyDetail, { params: { gcId } });
  }

  async testDevPage() {
    let data = await this.http.localGet(`http://www.eolinker.com/#/home/database/inside//table/?tableID=28352&mode=mysql&databaseHashKey=6auj9Ixd7fe23d7234fd339e2c63ff538e5d6ccd7744cfd&userType=2`)
    console.log(data);
    return data;
  }




  constructor(public http: MyHttpService, public storage: StorageService) { }

}
