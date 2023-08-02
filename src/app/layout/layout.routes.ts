import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadChildren: () => import('../users/shell/users.route'),
  },
] as Routes;
