import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HomeComponent } from "./components/home/home.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "login",
        title: "Login",
        component: LoginComponent,
    },
    {
        path: "home",
        title: "Home",
        component: HomeComponent,
        canActivate: [authGuard],
    },
    {
        path: "**",
        title: "404 - Not Found",
        component: PageNotFoundComponent,
    },
];
