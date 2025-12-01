import { Injectable, signal, computed, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly FAVORITES_KEY = 'favorites';
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private favoritesSignal = signal<Quote[]>(this.getFavorites());
  favorites = computed(() => this.favoritesSignal());

  constructor() {}

  saveFavorite(quote: Quote): void {
    if (!this.isBrowser) return;

    const updated = [...this.favoritesSignal(), quote];
    this.persist(updated);
  }

  removeFavorite(quoteId: string): void {
    if (!this.isBrowser) return;

    const updated = this.favoritesSignal().filter(q => q.id !== quoteId);
    this.persist(updated);
  }

  toggleFavorite(quote: Quote): void {
    if (!this.isBrowser) return;

    if (this.isFavorite(quote.id)) {
      this.removeFavorite(quote.id);
    } else {
      this.saveFavorite(quote);
    }
  }

  isFavorite(quoteId: string): boolean {
    return this.favoritesSignal().some(q => q.id === quoteId);
  }

  getFavorites(): Quote[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  private persist(favorites: Quote[]): void {
    this.favoritesSignal.set(favorites);
    if (this.isBrowser) {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }
}
