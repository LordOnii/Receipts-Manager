import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OcrService } from "../../services/ocr.service";
import { catchError, lastValueFrom, tap, throwError } from "rxjs";
import { EditorBoxComponent } from "../editor-box/editor-box.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-receipts-upload",
    imports: [CommonModule, FormsModule, EditorBoxComponent],
    templateUrl: "./receipts-upload.component.html",
    styleUrl: "./receipts-upload.component.css",
})
export class ReceiptsUploadComponent {
    private ocr = inject(OcrService);

    public image: File | null = null;
    public thumbnail: string | ArrayBuffer | null = null;
    public showEditor: boolean = false;

    public async onSubmit() {
        if (!this.image) {
            console.log("No file found");
            return;
        }
        console.log("button clicked");
        this.showEditor = true;
    }

    public onFileSelected(egg: Event) {
        const input = egg.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.image = input.files[0];
            this.previewThumbnail(input.files[0]);
        }
    }

    private previewThumbnail(file: File): void {
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                // convert image file to base64 string
                this.thumbnail = reader.result;
            },
            false,
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }
}
