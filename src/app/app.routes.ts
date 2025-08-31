import { Routes } from '@angular/router';
import { PolicePersonnelComponent } from './pages/police-personnel/police-personnel.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/personnel',
        pathMatch: 'full'
    },
    {
        path: 'personnel',
        component: PolicePersonnelComponent,
        title: '台北市警察局人事查詢系統'
    },
    {
        path: 'taipei',
        loadComponent: () => import('./pages/taipei/taipei').then(m => m.Taipei)
    },
    {
        path: '**',
        redirectTo: '/personnel'
    }
];
