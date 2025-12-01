import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quote } from '../../../core/models/quote.model';

@Component({
  selector: 'app-quote-card',
  imports: [],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCard {
  @Input() quote!: Quote;
  @Input() isFavorite: boolean = false;

  @Output() refresh = new EventEmitter<void>();
  @Output() share = new EventEmitter<Quote>();
  @Output() toggleFavorite = new EventEmitter<Quote>();

  onRefresh(): void {
    this.refresh.emit();
  }

  onShare(): void {
    this.share.emit(this.quote);
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.quote);
  }

}
