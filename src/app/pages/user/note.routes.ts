import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./components/note-landing/note-landing.component').then(
        (c) => c.UserLandingComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/note-register/note-register.component').then(
        (c) => c.UserRegisterComponent
      ),
  },
  {
    path: 'update',
    loadComponent: () =>
      import('./components/note-edit/note-edit.component').then(
        (c) => c.UserEditComponent
      ),
  },
] as Route[];
