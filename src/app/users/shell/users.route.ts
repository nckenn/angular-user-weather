import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('../feature/random-users-list/random-users-list.component'),
  },
  {
    path: 'users',
    loadComponent: () => import('../feature/users-list/users-list.component'),
  },
] as Routes;
