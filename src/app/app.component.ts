import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReceiptsUploadComponent } from "./containers/receipts-upload/receipts-upload.component";
import { ReceiptsDisplayComponent } from "./containers/receipts-display/receipts-display.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
    selector: "app-root",
    imports: [
        RouterOutlet,
        CommonModule,
        ReceiptsDisplayComponent,
        ReceiptsUploadComponent,
        NavBarComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "receipt-manager";
}
