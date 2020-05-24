import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from '../chart/chart.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
