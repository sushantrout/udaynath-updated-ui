import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Spinkit } from 'ng-http-loader';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit{
  public spinkit = Spinkit;
  title = "sefty-client";
  selectedValue: any = ["ODIA"];
  selectedValue1: any;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    if (localStorage.getItem('locale')) {
      let browserLang = localStorage.getItem('locale');
      if (!browserLang) {
        browserLang = "";
      }
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }
  ngOnInit(): void {

  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }
}


