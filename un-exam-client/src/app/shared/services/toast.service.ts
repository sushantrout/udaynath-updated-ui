import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  sucess(summary: string, head: string, detail?: string,) {
    if (summary && detail) {
      this.messageService.add({ severity: "success", summary, detail });
    } else if (summary) {
      let header = head;
      this.messageService.add({
        severity: "success",
        summary: header,
        detail: summary,
      });
    }
  }
  warning(summary: string, head: string, detail?: string) {
    if (summary && detail) {
      this.messageService.add({ severity: "warn", summary, detail });
    } else if (summary) {
      let header = head;
      let message = this.translateService.instant(
        "message." + [summary] + ".body"
      );
      this.messageService.add({
        severity: "warn",
        summary: header,
        detail: message,
      });
    }
  }
  error(summary: string, head: string, detail?: string) {
    if (summary && detail) {
      this.messageService.add({ severity: "error", summary, detail });
    } else if (summary) {
      let header = head;
      let message = this.translateService.instant(
        "message." + [summary] + ".body"
      );
      this.messageService.add({
        severity: "error",
        summary: header,
        detail: message,
      });
    }
  }
}
