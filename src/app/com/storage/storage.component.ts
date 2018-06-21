import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-storage",
  templateUrl: "./storage.component.html",
  styleUrls: ["./storage.component.css"]
})
export class StorageComponent implements OnInit {
  percent = 0;
  currentStorageSize = 0;
  nzStatus: "success" | "exception" | "active" = "active";
  isComputingMaxStorageSize: boolean = false;
  maxStorageSize: number = 4080;
  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }
  format = percent =>
    `${this.currentStorageSize.toFixed(1)} / ${this.maxStorageSize}`;

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }
  compute() {}

  computeMaxSize() {
    if (this.isComputingMaxStorageSize) {
      return;
    }
    this.isComputingMaxStorageSize = true;
    let data = "";
    for (let key in localStorage) {
      data += localStorage.getItem(key);
    }
    this.currentStorageSize = data.length / 1024;
    this.percent = (this.currentStorageSize / this.maxStorageSize) * 100;
  }
  constructor() {}

  ngOnInit() {
    this.computeMaxSize();
    setInterval(() => this.computeMaxSize, 2000);
  }
}
