import { Injectable } from '@angular/core';
import { MyHttpService } from './http.service';
import { StorageService } from './storage.service';
import { MenuType, RoleType } from '../../constant';
// import { RecursiveTemplateAstVisitor } from '@angular/compiler';
@Injectable()
export class EmpService {


    api = {
        login: '/employee/login',//员工登录
        orgCreate: "/api/org/create",//创建组织
        orgUpdate: "/api/org/update",//更新组织
        orgDelete: "/api/org/delete",//删除组织
        orgDetail: "/api/org/detail",//组织详情
        orgList: "/api/org/list",//组织列表
        roleCreate: '/api/role/create',
        roleUpdate: '/api/role/update',
        roleDelete: '/api/role/delete',
        roleList: '/api/role/list',
        employeeCreate: '/api/employee/create',
        employeeUpdate: "/api/employee/update",
        employeeDelete: "/api/employee/delete",
        employeeList: "/api/employee/list",
        employeeDetail: "/api/employee/detail",
        marketDetail: '/api/market/detail',
    }
    async  marketDetail(mktId: number) {
        let result = await this.http.Get(this.api.marketDetail, { params: { mktId } });


        if (!result.market.menuIds) result.market.menuIds = [];
        if (typeof result.market.menuIds == 'string') result.market.menuIds = result.market.menuIds.split(',')
        return result.market;
    }
    async  employeeDetail(epId: number) {
        let result = await this.http.Get(this.api.employeeDetail, { params: { epId } });
        // if (!result.employee.epId) result.employee.epId = [];
        // if (typeof result.employee.epId == 'string') result.employee.epId = result.employee.epId.split(',')
        return result.employee;
    }
    async  employeeList(marketId: number, orgId: number) {
        let result = await this.http.Get(this.api.employeeList, { params: { marketId, orgId } })
        return result.employees;
    }
    async  employeeDelete(epId: number) {
        console.log(epId);
        return this.http.Get(this.api.employeeDelete, { params: { epId } })
    }
    async  employeeUpdate(employee: IEmployee) {
        return this.http.Post(this.api.employeeUpdate, employee)
    }
    async  employeeCreate(employee: IEmployee) {
        if (Array.isArray(employee.roleIds)) employee.roleIds = employee.roleIds.join(',');
        return this.http.Post(this.api.employeeCreate, employee)
    }
    async   roleList(marketId: number) {
        let result = await this.http.Get(this.api.roleList, { params: { marketId } });
        (result.roles as IRole[]).forEach((role: IRole) => {
            if (typeof role.menuIds == 'string') {
                role.menuIds = (role.menuIds.split(',') as any[])
            }

        });
        return result.roles;

    }
    async  roleDelete(roleId: number) {
        this.http.Get(this.api.roleDelete, { params: { roleId } })
    }

    async   roleUpdate(role: IRole) {
        if (Array.isArray(role.menuIds)) role.menuIds = role.menuIds.join(',');
        return this.http.Post(this.api.roleUpdate, role)
    }
    async  roleCreate(role: IRole) {

        if (Array.isArray(role.menuIds)) role.menuIds = role.menuIds.join(',');
        let result = await this.http.Post(this.api.roleCreate, role);
        return result.menus;
    }
    async  orgList(marketId: number, parentId: number) {
        let result = await this.http.Get(this.api.orgList, { params: { marketId, parentId } });
        return result.orgs;
    }
    async orgDetail(orgId: number, ) {
        let result = await this.http.Get(this.api.orgDetail, { params: { orgId, } });
        return result.org;
    }
    async orgDelete(orgId: number) {
        return this.http.Get(this.api.orgDelete, { params: { orgId } })
    }
    async  orgUpdate(org: IOrg) {
        return this.http.Post(this.api.orgUpdate, org)
    }
    async  orgCreate(org: IOrg) {
        return this.http.Post(this.api.orgCreate, org)
    }

    async EmpLogin(userName: string, password: string) {
        return this.http.Post(this.api.login, { userName, password });
    }






    constructor(public http: MyHttpService, public storage: StorageService) { }

}
