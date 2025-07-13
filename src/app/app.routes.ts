import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/components/dashboard.component';
import { authGuard } from './shared/services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./shared/components/login/login.routes'),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild:[authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'notes', loadChildren: () => import('./pages/user/note.routes') },
    ],
  },
];
