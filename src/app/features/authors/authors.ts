import { Component, OnInit } from '@angular/core';
import { Author, Quote } from '../../core/models/quote.model';
import { QuoteService } from '../../core/services/quote.service';
import { StorageService } from '../../core/services/storage.service';
import { CommonModule } from '@angular/common';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authors',
  imports: [
    CommonModule,
    BottomNav,
    FormsModule
  ],
  templateUrl: './authors.html',
  styleUrl: './authors.css',
})
export class Authors implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  searchTerm = '';
  selectedAuthor: Author | null = null;
  authorQuotes: Quote[] = [];
  loadingQuotes = false;

  constructor(
    private quoteService: QuoteService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.authors = this.quoteService.getAuthors();
    this.filteredAuthors = this.authors;
  }

  filterAuthors(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(term)
    );
  }

  selectAuthor(author: Author): void {
    this.selectedAuthor = author;
    this.loadAuthorQuotes(author.slug);
  }

  loadAuthorQuotes(authorSlug: string): void {
    this.loadingQuotes = true;

    this.authorQuotes = this.quoteService.getByAuthor(authorSlug);

    this.loadingQuotes = false;
  }


  clearSelection(): void {
    this.selectedAuthor = null;
    this.authorQuotes = [];
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  toggleFavorite(quote: Quote): void {
    this.storageService.toggleFavorite(quote);
  }

  isFavorite(quoteId: string): boolean {
    return this.storageService.isFavorite(quoteId);
  }
}
