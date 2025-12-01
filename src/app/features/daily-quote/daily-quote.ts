import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuoteCard } from '../../shared/components/quote-card/quote-card';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';
import { Quote } from '../../core/models/quote.model';
import { CacheService } from '../../core/services/cache.service';
import { QuoteService } from '../../core/services/quote.service';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-daily-quote',
  imports: [
    CommonModule,
    QuoteCard,
    BottomNav
  ],
  templateUrl: './daily-quote.html',
  styleUrl: './daily-quote.css',
})
export class DailyQuote implements OnInit {

  dailyQuote: Quote | null = null;
  loading = false;
  currentDate = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  constructor(
    private quoteService: QuoteService,
    private cacheService: CacheService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadDailyQuote();
  }

  /** Version locale : pas d’HTTP */
  loadDailyQuote(): void {
    const cached = this.cacheService.getDailyQuote();

    if (cached) {
      this.dailyQuote = cached;
    } else {
      this.loading = true;

      const quote = this.quoteService.getDailyQuote();
      this.dailyQuote = quote;

      this.cacheService.saveDailyQuote(quote);
      this.loading = false;
    }
  }

  shareQuote(quote: Quote): void {
    const text = `"${quote.content}" - ${quote.author}`;

    if (navigator.share) {
      navigator.share({
        title: 'Citation du jour',
        text: text
      }).catch(() => {
        this.copyToClipboard(text);
      });
    } else {
      this.copyToClipboard(text);
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      alert('Citation copiée !');
    });
  }

  toggleFavorite(quote: Quote): void {
    this.storageService.toggleFavorite(quote);
  }

  isFavorite(quoteId: string): boolean {
    return this.storageService.isFavorite(quoteId);
  }
}
