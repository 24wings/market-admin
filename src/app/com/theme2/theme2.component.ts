import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-theme2",
  templateUrl: "./theme2.component.html",
  styleUrls: ["./theme2.component.css"]
})
export class Theme2Component implements OnInit {
  @Input()
  material: {
    home_image_urls: string[];
    ticket_image_urls: string[];
    share_image_url: string;
  };
  @Input() mode: number = 1;
  constructor() {}

  ngOnInit() {}
}
