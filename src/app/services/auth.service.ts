import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private http = inject(HttpClient);
    private isAuthenticated = false;

    constructor(private router: Router) {}

    login(username: string, password: string): Observable<AuthRequest> {
        const endpoint: string = `/api/login`;
        const body = {
            username: username,
            password: password,
        };
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const request = this.http.post<AuthRequest>(endpoint, body, {
            headers,
        });

        console.log("Login request sent");

        return request.pipe(
            map((response) => {
                this.isAuthenticated = response.success;
                if (!response.success) console.error("Login failed");
                return {
                    success: response.success,
                    key: response.key ? response.key : undefined,
                };
            }),
            catchError((error) => {
                return of({ success: false, error: error.message });
            }),
        );
    }

    logout(): void {
        this.isAuthenticated = false;
        this.router.navigate(["/login"]);
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}

export interface AuthRequest {
    success: boolean;
    key?: string;
    error?: string;
}
