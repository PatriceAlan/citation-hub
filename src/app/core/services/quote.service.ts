import { Injectable } from '@angular/core';
import quotesData from '../../data/quotes.json'
import { Author, Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private quotes: Quote[] = quotesData;

  constructor() {}

  getAll(): Quote[] {
    return this.quotes;
  }

  getRandom(): Quote {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }

  getByAuthor(slug: string): Quote[] {
    return this.quotes.filter(q => q.authorSlug === slug);
  }


  search(keyword: string): Quote[] {
    const key = keyword.toLowerCase();
    return this.quotes.filter(q =>
      q.content.toLowerCase().includes(key) ||
      q.author.toLowerCase().includes(key)
    );
  }

  getDailyQuote(): Quote {
    const index = new Date().getDate() % this.quotes.length;
    return this.quotes[index];
  }

  getAuthors(): Author[] {
    const uniqueAuthorsMap: { [slug: string]: Author } = {};

    this.quotes.forEach(q => {
      if (!uniqueAuthorsMap[q.authorSlug]) {
        uniqueAuthorsMap[q.authorSlug] = { name: q.author, slug: q.authorSlug };
      }
    });

    return Object.values(uniqueAuthorsMap);
  }
}
