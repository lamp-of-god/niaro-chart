import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartPageComponent } from './chart-page/chart-page.component';
import { CryptoQuotesService } from './crypto-quotes.service';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { ChartPlotComponent } from './chart-plot/chart-plot.component';



@NgModule({
  declarations: [ChartPageComponent, AddCurrencyComponent, ChartPlotComponent],
  imports: [
    CommonModule, FormsModule,
  ],
  exports: [ChartPageComponent],
  providers: [
    CryptoQuotesService,
  ]
})
export class ChartModule { }
