import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from '../chart/chart.module';
import { PriffetPipe } from '../priffet/priffet.pipe';


@NgModule({
  declarations: [AppComponent, PriffetPipe],
  imports: [BrowserModule, HttpClientModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
