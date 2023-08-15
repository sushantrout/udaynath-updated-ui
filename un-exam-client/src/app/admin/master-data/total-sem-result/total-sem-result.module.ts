import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadAllSemTotalComponent } from './download-all-sem-total/download-all-sem-total.component';
import { RouterModule } from '@angular/router';
import { TotalSemResultComponent } from './total-sem-result.component';
import { SharedModule } from 'primeng/api';
import { BipSharedModule } from 'src/app/shared/components/bip-shared/bip-shared.module';
import { AppSharedModule } from 'src/app/shared/shared.module';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [TotalSemResultComponent, DownloadAllSemTotalComponent],
  imports: [
    CommonModule,
    BipSharedModule,
    AppSharedModule,
    NgxPrintModule,
    RouterModule.forChild([
      {
        path: 'total',
        component: DownloadAllSemTotalComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class TotalSemResultModule {
  constructor() {
    console.log("total-result")
  }
}
