import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReceiptsDisplayComponent } from "./components/receipts-display/receipts-display.component";
import { ReceiptsUploadComponent } from "./components/receipts-upload/receipts-upload.component";
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
    styleUrl: "./app.component.css"
})
export class AppComponent {
    title = "receipt-manager";
}

// isLoading = false;

// onImageUpload(event: Event): void {
//   const input = event.target as HTMLInputElement;

//   if (input.files && input.files[0]) {
//     const file = input.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const imageData = reader.result as string;
//       this.extractText(imageData);
//     };

//     reader.readAsDataURL(file);
//   }
// }

// private extractText(imageData: string): void {
//   this.isLoading = true;
//   Tesseract.recognize(imageData, 'eng', {
//     logger: (info) => console.log(info),
//   })
//     .then(({ data: { text } }) => {
//       console.log('Extracted Text:', text);
//     })
//     .catch((error) => {
//       console.error('Error processing image:', error);
//     })
//     .finally(() => {
//       this.isLoading = false;
//     });
// }
