import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  {
    path: 'homepage',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
] as Routes;
