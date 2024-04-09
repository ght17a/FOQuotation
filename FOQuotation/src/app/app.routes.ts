import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: 'quoting', redirectTo: '/quoting/', pathMatch: 'full' },
    { path: 'quoting/:id', component: HomePageComponent}
];
