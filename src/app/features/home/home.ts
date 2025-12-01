import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../core/services/quote.service';
import { CacheService } from '../../core/services/cache.service';
import { StorageService } from '../../core/services/storage.service';
import { Quote } from '../../core/models/quote.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuoteCard } from '../../shared/components/quote-card/quote-card';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    QuoteCard,
    BottomNav
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  currentQuote: Quote | null = null;
  quotesCache: Quote[] = [];
  loading = false;
  favoritesCount = 0;

  constructor(
    private quoteService: QuoteService,
    private cacheService: CacheService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavoritesCount();
    this.initializeQuotes();
  }

  initializeQuotes(): void {
    const cached = this.cacheService.getBatch();

    if (cached && cached.length > 0) {
      this.quotesCache = cached;
      this.displayRandomFromCache();
    } else {
      this.loadQuotesBatch();
    }
  }

  /** Version locale : pas de subscribe() */
  loadQuotesBatch(): void {
    this.loading = true;

    const quotes = this.quoteService.getAll(); // synchronisé depuis JSON
    this.quotesCache = quotes;
    this.cacheService.saveBatch(quotes);
    this.displayRandomFromCache();

    this.loading = false;
  }

  displayRandomFromCache(): void {
    if (this.quotesCache.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.quotesCache.length);
      this.currentQuote = this.quotesCache[randomIndex];
    }
  }

  loadNewQuote(): void {
    this.displayRandomFromCache();
  }

  shareQuote(quote: Quote): void {
    const text = `"${quote.content}" - ${quote.author}`;

    if (navigator.share) {
      navigator.share({
        title: 'Citation inspirante',
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
      alert('Citation copiée dans le presse-papier !');
    });
  }

  toggleFavorite(quote: Quote): void {
    this.storageService.toggleFavorite(quote);
    this.loadFavoritesCount();
  }

  isFavorite(quoteId: string): boolean {
    return this.storageService.isFavorite(quoteId);
  }

  loadFavoritesCount(): void {
    this.favoritesCount = this.storageService.getFavorites().length;
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
