import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/main-page/main-page.component').then(m => m.MainPageComponent)
  },
  {
    path: 'api-example',
    loadComponent: () => import('./components/api-example/api-example.component').then(m => m.ApiExampleComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
