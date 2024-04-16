import { Routes } from '@angular/router';
import { AddYachtComponent } from './add-yacht/add-yacht.component';
import { BookYachtComponent } from './book-yacht/book-yacht.component';
import { ListYachtComponent } from './list-yacht/list-yacht.component';

export const routes: Routes = [
    { path: '', redirectTo: '/list-yacht', pathMatch: 'full' },
    { path: 'add-yacht', component: AddYachtComponent },
    { path: 'book-yacht', component: BookYachtComponent },
    { path: 'list-yacht', component: ListYachtComponent }
];
