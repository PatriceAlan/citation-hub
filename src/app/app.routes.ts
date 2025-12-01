import { Routes } from '@angular/router';
import { Favorites } from './features/favorites/favorites';
import { DailyQuote } from './features/daily-quote/daily-quote';
import { Authors } from './features/authors/authors';
import { Keywords } from './features/keywords/keywords';
import { Home } from './features/home/home';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'daily', component: DailyQuote },
    { path: 'authors', component: Authors },
    { path: 'keywords', component: Keywords },
    { path: 'favorites', component: Favorites },
    { path: '**', redirectTo: '' }
];
