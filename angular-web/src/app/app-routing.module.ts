import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

const routes: Routes = [
  // Public rutes goes here
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [{ path: '', component: LoginComponent, pathMatch: 'full' }],
  },

  // User rutes goes here

  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: UserDashboardComponent,
      },
    ],
  },

  // Admin rutes goes here
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
    ],
  },

  // No layout rutes

  // Other routes redirect to login
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
