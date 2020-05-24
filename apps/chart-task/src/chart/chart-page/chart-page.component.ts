import { Component, OnInit } from '@angular/core';
import { CryptoQuotesService, Ticker } from '../crypto-quotes.service';
import {Observable, BehaviorSubject, timer, Subscription} from 'rxjs';

import {switchMap, map, retryWhen, delayWhen, delay} from 'rxjs/operators';
import HistogramItem from "../chart-plot/interfaces/histogram-item";
import {environment} from "../../environments/environment";


@Component({
  selector: 'chart-task-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.styl']
})
export class ChartPageComponent implements OnInit {
  /** List of available currencies to pick from */
  availableCurrenciesList$: Observable<string[]>;
  /** List of chosen currencies */
  chosenCurrencies$ = new BehaviorSubject<string[]>(['ETC', 'LTC', 'DASH', 'LINK', 'ETH', 'BSV', 'ATOM']);
  /**
   * List of subscriptions to currencies tickers.
   * Keep only to possibly unsubscribe later.
   *
   * Updates on chosen currencies change.
   */
  tickersSubscriptions: Record<string, Subscription> = {};
  /**
   * Tickers to render chart with. Updates periodically with `chart_refresh_period` period.
   */
  histogramItems$ = new BehaviorSubject<HistogramItem[]>([]);


  /**
   * Creates chart page component.
   *
   * @param cryptoQuotesService   Service to be injected.
   */
  constructor(private cryptoQuotesService: CryptoQuotesService) { }

  ngOnInit(): void {
    // Assume markets list doesn't change over app living time, so no need to
    // retrieve full list of currencies each time.
    this.cryptoQuotesService.getCurrencies()
      .pipe(retryWhen(errors => errors.pipe(delay(3000))))
      .subscribe((currencies: string[]) => {
        this.availableCurrenciesList$ = this.chosenCurrencies$.pipe(
          map((chosen) => currencies.filter(x => !chosen.includes(x)))
        );
      });

    this.chosenCurrencies$.subscribe((currencies: string[]) => {
      currencies
        .filter(x => !this.tickersSubscriptions[x])
        .forEach((currency: string) => {
          this.tickersSubscriptions[currency] =
            timer(0, environment.chart_refresh_period)
              .pipe(switchMap(() => this.cryptoQuotesService.getTicker(currency)))
              .pipe(retryWhen(errors => errors.pipe(delay(5000))))
              .subscribe((ticker: Ticker) => {
                const items = [...this.histogramItems$.value];
                const existed = items.filter(x => x.name === currency);
                if (existed.length === 1) {
                  if (existed[0].value === ticker.Bid) {
                    return;  // No update in case value didn't change
                  }
                  existed[0].value = ticker.Bid;
                } else {
                  items.push({
                    name: currency,
                    value: ticker.Bid,
                  });
                }
                this.histogramItems$.next(items);
              });
        });
    });
  }

  /**
   * Adds given currency to currencies list in case it is not in it.
   *
   * @param currency   Currency to be added.
   */
  addCurrency(currency: string): void {
    const currencies = [...this.chosenCurrencies$.value];
    if (currencies.includes(currency)) {
      return;
    }
    currencies.push(currency);
    this.chosenCurrencies$.next(currencies);
  }
}
