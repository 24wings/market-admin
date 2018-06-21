  /**
   * type=1 全局参数
   * type=2 本地参数
   */
  interface  IParam{
      id?:number;
 paramName?:string;
 paramKey?:string;
 paramValue?:string;
 type?:number;
 mktId?:number;
 remark?:string;
 addition?:string;
 defaultValue?:string;
 /**是否本地参数 */
 isLocal?:boolean;

}
interface IOrg {
  /** 组织Id */  
  orgId?: number;
    /** 组织名称 */  
    orgName?: string;
  /** 上级组织Id,默认0顶级组织 */
  parentId?: number;    /** 公司Id */
  marketId?: number;
  parentName?:string;
}
interface IEmployee {
  epId?: number;
  epName?: string;
  epUserName?: string;
  password?: string;
  passwordHash?: string;
  createTime?: Date;
  updateTime?: Date;
  menuIds?: string;
  employeeType?: number;
  marketId?: number;
  orgId?:number;
  roleIds?:string | number[];

}

interface IMarket {
  mktId?: undefined;
  mktName?: string;
  telephone?: string;
  province?: string;
  city?: string;
  area?: string;
  lat?: undefined;
  lng?: undefined;
  status?: undefined;
  licenseUrl?: string;
  legalPeson?: string;
  legalPhone?: string;
  gcId?: number;
  menuIds?:number[] | string;

}


interface IDevelop {
  devId?: number;
  devUserName?: string;
  password?: string;
  passwordHash?: string;
  createTime?: Date;
  updateTime?: Date;
}
interface IRole {
  roleId?: number;
  roleName?: string;
  roleType?: number;
  marketId?: number;
  createTime?: Date;
  updateTime?: Date;
  menuIds?: string | number[];
  parentId?: number;
  menus?:IMenu[];

}

interface IMenu {
  label?: string;
  /**
   * 	文本	varchar	20		修改删除
   */
  text?: string;
  /**
   * i18n主键	varchar	10		修改删除
   */
  i18n?: string;
  /**
   * 上级菜单id	int	11		修改删除
   */
  parentId?: number;
  /**angular 路由	varchar	64		修改删除
   * 
   */
  link?: string;
  /**
   * 外部链接	varchar	64		修改删除
   */
  externalink?: string
  /**
   * 打开链接的方式	varchar	10		修改删除
   */
  target?: "_blank" | "_self" | "_parent" | "_top";
  /**
   * 	图标	varchar	20		修改删除
   */
  icon?: string;
  /**
   * 徽章	int	11		修改删除
   */
  badge?: number;
  /**
   * 是否启用徽章	tinyint	1		修改删除
   */
  badgeDot?: boolean;
  /**
   * 徽章的颜色	varchar	20		修改删除
   * 
   */
  badgeStatus?: string;
  /**是否隐藏菜单	tinyint	1		修改删除 */
  hide?: boolean;
  hideInBreadcrumb?: boolean;//	隐藏面包屑，指 `page-header` 组件的自动生成面包屑时有效	tinyint	1		修改删除
  // acl	ACL配置，若导入 `@delon/acl` 时自动有效，等同于 `ACLService.can(roleOrAbility: ACLCanType)` 参数值	varchar	10		修改删除
  shortcut?: boolean;
  shortcutRoot?: boolean;
  reuse?: boolean;
  menuId?: number;
  menuType?: number;
  creatorId?: number;
  checked?: boolean;
}

interface IGroup {
  indeterminate?: boolean;
  menuId?: number;
  link?: string;
  text?: string;
  children?: IMenu[];
  checked?: boolean;
  checkdAll?: boolean;
  icon?: string;
  allChecked?: boolean;
}

interface IGroupCompany {
  gcId?: number;
  gcName?: string;
  gcMenuIds?: number[] | string;
  createTime?: Date;
}


interface IDb {

  /** 数据库Id */
  dbId?: number;

  /** 开发者Id */
  devId?: number;

  /** 数据库名称 */
  name?: string

  /** 注释 */
  comment?: string

}
interface Template {

  /** 模板Id */
  templateId?: number;

  /** 模板名称 */
  name?: string

  /** 模板描述 */
  comment?: string;
  template: string;

  /** 开发者Id */
  devId?: number;

}