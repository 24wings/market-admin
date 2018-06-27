import { Component, OnInit } from "@angular/core";
import { ConfigService, StorageService, CommonService, DevService, EmpService } from "../../service";
import { MenuType } from "../../../constant";

enum View {
  List = 1,
  AddDatabase = 2
}
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  newDb: IDb = {
    name: '',
    comment: ''
  }
  dbs: IDb[] = [];
  async createDb() {
    await this.dev.dbCreate(this.newDb);
    await this.dbList();
  }
  async dbList() {
    this.dbs = await this.dev.dbList();
  }

  isCollapsed = false;

  groups: IGroup[] = [];
  state = View.List;
  View = View;
  shop_user_name: string;
  isDev: boolean = this.storage.userType == MenuType.Develop;
  sendProductOrdersNum: number = 0;

  constructor(
    public config: ConfigService,
    public storage: StorageService,
    public common: CommonService,
    public dev: DevService,
    public emp: EmpService
  ) { }

  async ngOnInit() {
    /**Kaifazhe */
    if (this.storage.userType == 1) {
      this.shop_user_name = this.storage.shop_user_name;
    } else {
      this.shop_user_name = this.storage.employee.epName;

    }

    // this.shop_user_name = this.storage.dev.devUserName;
    this.groups = this.common.getModuleGroup(this.storage.menuList);

  }

  async getAdminInfo() { }
  async getSendProductOrdersNum() { }

  async logout() {
    // await this.config.fruit.adminLogout();
    localStorage.removeItem("shop_id");
    switch (this.storage.userType) {
      case MenuType.Market:
        this.config.router.navigateByUrl("/admin/login");
        break;
      case MenuType.GroupCompany:
        this.config.router.navigateByUrl("/group/login");
        break;
      case MenuType.Develop:
        this.config.router.navigateByUrl("/dev/login");
        break;


    }

    // this.add2.add()
    // window.location.reload();
  }
}
