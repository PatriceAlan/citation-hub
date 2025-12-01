import { Component, OnInit } from '@angular/core';
import { Quote } from '../../core/models/quote.model';
import { StorageService } from '../../core/services/storage.service';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [BottomNav, CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites implements OnInit {
  favorites: Quote[] = [];

  constructor(
    private storageService: StorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.storageService.getFavorites();
  }

  removeFavorite(quoteId: string): void {
    if (confirm('Supprimer cette citation de vos favoris ?')) {
      this.storageService.removeFavorite(quoteId);
      this.loadFavorites();
    }
  }

  clearAllFavorites(): void {
    if (confirm('Supprimer tous les favoris ? Cette action est irréversible.')) {
      this.favorites.forEach(quote => {
        this.storageService.removeFavorite(quote.id);
      });
      this.loadFavorites();
    }
  }

  shareQuote(quote: Quote): void {
    const text = `"${quote.content}" - ${quote.author}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Citation favorite',
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

  goBack(): void {
    this.location.back();
  }
}
