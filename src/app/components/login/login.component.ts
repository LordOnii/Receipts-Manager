import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-root",
    standalone: true,
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
        this.authService.login(this.username, this.password).then((success) => {
            if (success) {
                this.router.navigate([""]);
            } else {
                alert("Login failed. Please try again.");
            }
        });
    }
}
