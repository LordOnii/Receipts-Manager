import { Component } from "@angular/core";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ReceiptsUploadComponent } from "../receipts-upload/receipts-upload.component";
import { ReceiptsDisplayComponent } from "../receipts-display/receipts-display.component";

@Component({
    selector: "app-home",
    imports: [
        NavBarComponent,
        ReceiptsUploadComponent,
        ReceiptsDisplayComponent,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.css"
})
export class HomeComponent {}
