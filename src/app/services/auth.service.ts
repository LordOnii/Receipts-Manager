import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private isAuthenticated = false;

    constructor(private router: Router) {}

    login(username: string, password: string): Promise<boolean> {
        // Simulate server response
        return new Promise((resolve) => {
            if (username === "user" && password === "password") {
                this.isAuthenticated = true;
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    logout(): void {
        this.isAuthenticated = false;
        this.router.navigate(["/login"]);
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}
