import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DevService } from '../../../lib';
@Component({
  selector: 'app-db-page',
  templateUrl: './db-page.component.html',
  styleUrls: ['./db-page.component.css']
})
export class DbPageComponent implements OnInit {
  dataSet: DbTable[] = [];
  tableListByDbId() {
    this.listTables
  }
  constructor(public dev: DevService, public route: ActivatedRoute, public router: Router) {
    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        this.listTables()
      }
    })
  }


  ngOnInit() {
    this.listTables();
  }
  async listTables() {
    let tables: DbTable[] = await this.dev.tableListByDbId(this.route.snapshot.params.dbId);
    this.dataSet = tables.map(table => {
      if (typeof table.cols == 'string') {
        table.cols = JSON.parse(table.cols);
      }
      table.fieldSize = table.cols.length;
      return table;
    });
  }
  removeTable() {

  }

}
