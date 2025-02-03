import { Component, Output, EventEmitter, Input, inject } from "@angular/core";
import { CanvasComponent } from "../../components/canvas/canvas.component";
import { OcrService } from "../../services/ocr.service";
import {
    catchError,
    from,
    lastValueFrom,
    Observable,
    switchMap,
    tap,
    throwError,
} from "rxjs";

@Component({
    selector: "app-editor-box",
    templateUrl: "./editor-box.component.html",
    styleUrls: ["./editor-box.component.css"],
    imports: [CanvasComponent],
})
export class EditorBoxComponent {
    @Input() imageFile!: File;
    @Output() close = new EventEmitter<void>();

    private selection: CropSelection | null = null;
    private croppedImage: File = new File([], ""); // temporary
    private ocr = inject(OcrService);

    public onClose(): void {
        this.close.emit();
    }

    public async onSubmit() {
        // OCR logic
        await this.ocr.initialize();
        try {
            // Wait for recognition to complete before terminating
            await lastValueFrom(
                this.ocr.recognize(this.croppedImage).pipe(
                    tap((text: string) => {
                        console.log(this.croppedImage);
                        console.log("Recognized text:", text);
                    }),
                    catchError((error) => {
                        alert("Unable to fetch text from the image");
                        return throwError(() => error);
                    }),
                ),
            );
        } catch (e) {
            console.error("Recognition error:", e);
        } finally {
            await this.ocr.terminate();
        }
    }

    public handleSelectionChanges(selection: CropSelection) {
        this.selection = selection;
        this.crop().subscribe({
            next: (file: File) => {
                this.croppedImage = file;
            },
            error: (err) => console.error("Cropping failed:", err),
        });
    }

    private crop(): Observable<File> {
        return new Observable((observer) => {
            if (!this.selection) return;
            if (!this.selection.width || !this.selection.height) {
                observer.error("Please select an area to crop");
                return;
            }

            const canvas = document.createElement("canvas");
            canvas.width = this.selection.width;
            canvas.height = this.selection.height;
            const ctx = canvas.getContext("2d")!;

            // First convert File to Image
            from(this.fileToImage(this.imageFile))
                .pipe(
                    switchMap((image) => {
                        ctx.drawImage(
                            image,
                            this.selection!.x,
                            this.selection!.y,
                            this.selection!.width,
                            this.selection!.height,
                            0,
                            0,
                            this.selection!.width,
                            this.selection!.height,
                        );

                        // Convert canvas to Blob Observable
                        return new Observable<Blob>((blobObserver) => {
                            canvas.toBlob((blob) => {
                                if (!blob) {
                                    blobObserver.error(
                                        "Failed to create blob from canvas",
                                    );
                                    return;
                                }
                                blobObserver.next(blob);
                                blobObserver.complete();
                            }, "image/png");
                        });
                    }),
                )
                .subscribe({
                    next: (blob) => {
                        // Convert Blob to File
                        const file = new File([blob], "cropped-image.png", {
                            type: "image/png",
                            lastModified: Date.now(),
                        });
                        observer.next(file);
                        observer.complete();
                    },
                    error: (err) => observer.error(err),
                });
        });
    }

    private async fileToImage(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

export interface CropSelection {
    height: number;
    width: number;
    x: number;
    y: number;
}
