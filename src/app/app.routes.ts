import { Routes } from '@angular/router';
import { AppRoute } from './constants/app-route';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: AppRoute.HOME_ROUTE, component: HomeComponent, canActivate: [authGuard],  data: { role: "ADMIN" } },
    { path: AppRoute.LOGIN_ROUTE, component: LoginComponent },
    { path: AppRoute.REGISTER_ROUTE, component: RegisterComponent },
    { path: AppRoute.NOT_FOUND_ROUTE, component: PageNotFoundComponent},
    // otherwise redirect to 404 error page
    { path: '**', redirectTo: AppRoute.NOT_FOUND_ROUTE}
];
