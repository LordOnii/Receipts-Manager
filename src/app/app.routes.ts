import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HomeComponent } from "./containers/home/home.component";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        title: "root",
        redirectTo: "login",
        pathMatch: "full",
    },
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
