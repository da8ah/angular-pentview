import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { NavComponent } from './base/nav/nav.component';
import { ClockingComponent } from './core/clocking/components/clocking.component';
import { ProfileComponent } from './core/profile/components/profile.component';
import { RolesComponent } from './core/roles/components/roles.component';
import { UsersComponent } from './core/users/components/users.component';


export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(comp => comp.LoginComponent) },
    {
        canActivate: [authGuard],
        path: 'dashboard',
        component: NavComponent,
        canActivateChild: [authGuard],
        children: [
            { path: 'clocking', component: ClockingComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'roles', component: RolesComponent },
            { path: 'users', component: UsersComponent },
            { path: '', redirectTo: 'clocking', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./base/not-found/not-found.component').then(comp => comp.NotFoundComponent) }
];
