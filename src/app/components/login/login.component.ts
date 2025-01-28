import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthRequest, AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-root",
    imports: [FormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent {
    username = "";
    password = "";

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    public login() {
        this.authService.login(this.username, this.password).subscribe({
            next: (result: AuthRequest) => {
                if (result.success) {
                    console.log(result.key);
                    // this.router.navigate(["/"], {
                    //     queryParams: { key: result.key },
                    // });
                    this.router.navigate(["/home"]);
                } else {
                    alert("Login failed. Please try again.");
                }
            },
            error: (error: Error) => {
                alert("An error occurred. Probably network related.");
            },
        });
    }
}
