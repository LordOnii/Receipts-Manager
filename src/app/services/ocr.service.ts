import { Injectable } from "@angular/core";
import cropImageData from "crop-image-data";
import { Observable, from } from "rxjs";
import Tesseract from "tesseract.js";
import { CropSelection } from "../containers/editor-box/editor-box.component";

@Injectable({
    providedIn: "root",
})
export class OcrService {
    private worker: Tesseract.Worker | null = null;

    async initialize(): Promise<void> {
        const { createWorker } = Tesseract;
        try {
            this.worker = await createWorker("eng");
        } catch (e: any) {
            console.error("Error initializing worker");
            console.warn(e);
            return;
        }
    }

    recognize(image: File | string): Observable<string> {
        console.log("Start recognize");
        if (!this.worker) throw new Error("Worker not initialized");

        return from(
            this.worker.recognize(image).then((response) => response.data.text),
        );
    }

    async terminate(): Promise<void> {
        console.log("Termination start");
        if (this.worker) {
            await this.worker.terminate();
            this.worker = null;
        }
    }
}
