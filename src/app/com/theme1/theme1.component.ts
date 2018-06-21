import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-theme1",
  templateUrl: "./theme1.component.html",
  styleUrls: ["./theme1.component.css"]
})
export class Theme1Component implements OnInit {
  @Input()
  material: {
    home_image_urls: string[];
    ticket_image_urls: string[];
    share_image_url: string;
  };
  /**
   * 1 海报
   * 2 详情
   */
  @Input() mode: number;
  constructor() {}

  ngOnInit() {}
}
