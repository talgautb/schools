import { Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { AboutComponent }      from './about/about.component';
import { SchoolComponent } from './school/school.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'school/:id',
    component: SchoolComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
