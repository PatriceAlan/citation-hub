import { Injectable } from '@angular/core';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private readonly CACHE_DURATION = 2 * 60 * 60 * 1000;
  private readonly BATCH_KEY = 'quotes_batch';
  private readonly BATCH_TIMESTAMP_KEY = 'quotes_batch_timestamp';
  private readonly DAILY_KEY = 'quotes_daily';
  private readonly DAILY_DATE_KEY = 'quotes_daily_date';

  constructor() {}

  saveBatch(quotes: Quote[]): void {
    localStorage.setItem(this.BATCH_KEY, JSON.stringify(quotes));
    localStorage.setItem(this.BATCH_TIMESTAMP_KEY, Date.now().toString());
  }

  getBatch(): Quote[] | null {
    const timestamp = localStorage.getItem(this.BATCH_TIMESTAMP_KEY);

    if (!timestamp || this.isCacheExpired(parseInt(timestamp))) {
      return null;
    }
    const data = localStorage.getItem(this.BATCH_KEY);
    return data ? JSON.parse(data) : null;
  }

  private isCacheExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_DURATION;
  }

  saveDailyQuote(quote: Quote): void {
    const today = new Date().toDateString();
    localStorage.setItem(this.DAILY_KEY, JSON.stringify(quote));
    localStorage.setItem(this.DAILY_KEY, today);
  }

  getDailyQuote(): Quote | null {
    const savedDate = localStorage.getItem(this.DAILY_DATE_KEY);
    const today = new Date().toDateString();

    if (savedDate !== today) {
      return null;
    }

    const data = localStorage.getItem(this.DAILY_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearDailyQuote(): void {
    localStorage.removeItem(this.DAILY_KEY);
    localStorage.removeItem(this.DAILY_DATE_KEY);
  }

  clearAll(): void {
    localStorage.removeItem(this.BATCH_KEY);
    localStorage.removeItem(this.BATCH_TIMESTAMP_KEY);
    localStorage.removeItem(this.DAILY_KEY);
    localStorage.removeItem(this.DAILY_DATE_KEY);
  }
}
