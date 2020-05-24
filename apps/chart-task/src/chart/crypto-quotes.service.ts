import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

/**
 * Provides services related to crypto currencies markets which are traded against USD.
 */
export class CryptoQuotesService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Returns list of currencies which are traded against USD.
   *
   * Note that not all currencies could be traded against USD,
   * so need to filter markets, not currencies from api.
   */
  getCurrencies(): Observable<string[]> {
    return this.httpClient.get(`/api/getmarkets`)
      .pipe(map((response: any): string[] => {
        return response.result
                .filter((x: Market) => x.IsActive && (x.BaseCurrency === 'USD'))
                .map((x: Market) => x.MarketCurrency)
                .sort();
      }));
  }

  /**
   * Returns ticker of given currency.
   *
   * @param currency   Currency to get ticker for.
   */
  getTicker(currency: string): Observable<Ticker> {
    return this.httpClient.get(`/api/getticker?market=USD-${currency}`).pipe(
      map((response: any): Ticker => {
        return response.result;
      }),
    );
  }
}

/**
 * Interface of /getmarkets API info.
 */
interface Market {
    "MarketCurrency": string,
    "BaseCurrency": string,
    "MarketCurrencyLong": string,
    "BaseCurrencyLong": string,
    "MinTradeSize": number,
    "MarketName": string,
    "IsActive": boolean,
    "IsRestricted": boolean,
    "Created": string,
    "Notice": string,
    "IsSponsored": string,
    "LogoUrl": string,
}

/**
 * Ticker interface.
 */
export interface Ticker {
  "Bid": number,
  "Ask": number,
  "Last": number,
}
