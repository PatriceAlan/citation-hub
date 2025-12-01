import { Component, OnInit } from '@angular/core';
import { POPULAR_KEYWORDS, Quote } from '../../core/models/quote.model';
import { StorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteCard } from '../../shared/components/quote-card/quote-card';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';
import { QuoteService } from '../../core/services/quote.service';

@Component({
  selector: 'app-keywords',
  imports: [
    CommonModule,
    FormsModule,
    QuoteCard,
    BottomNav
  ],
  templateUrl: './keywords.html',
  styleUrl: './keywords.css',
})
export class Keywords implements OnInit {
  keywords: string[] = POPULAR_KEYWORDS;
  filteredKeywords: string[] = [];
  searchTerm = '';
  selectedKeyword: string | null = null;
  keywordQuotes: Quote[] = [];
  loadingQuotes = false;
  currentIndex = 0;

  constructor(
    private quoteService: QuoteService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.filteredKeywords = this.keywords;
  }

  filterKeywords(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredKeywords = this.keywords.filter(keyword =>
      keyword.toLowerCase().includes(term)
    );
  }

  selectKeyword(keyword: string): void {
    this.selectedKeyword = keyword;
    this.currentIndex = 0;
    this.loadKeywordQuotes();

    this.filteredKeywords = [keyword];
  }


  loadKeywordQuotes(): void {
    this.loadingQuotes = true;

    const results = this.quoteService.search(this.selectedKeyword ?? '');

    this.keywordQuotes = results.slice(0, 10);

    this.loadingQuotes = false;
  }

  showNextQuote(): void {
    if (this.currentIndex < this.keywordQuotes.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  clearSelection(): void {
    this.selectedKeyword = null;
    this.keywordQuotes = [];
    this.currentIndex = 0;

    this.filteredKeywords = this.keywords;
  }

  shareQuote(quote: Quote): void {
    const text = `"${quote.content}" - ${quote.author}`;

    if (navigator.share) {
      navigator.share({
        title: 'Citation',
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
