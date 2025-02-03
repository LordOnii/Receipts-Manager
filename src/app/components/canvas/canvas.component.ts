// canvas.component.ts
import {
    Component,
    Input,
    OnChanges,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter,
} from "@angular/core";

@Component({
    selector: "app-canvas",
    templateUrl: "./canvas.component.html",
    styleUrl: "./canvas.component.css",
})
export class CanvasComponent implements OnChanges {
    @Input() imageFile!: File;
    @Output() selected = new EventEmitter<any>();

    @ViewChild("canvasEl") canvasEl!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private img = new Image();
    private isDrawing = false;
    private startX = 0;
    private startY = 0;
    private currentX = 0;
    private currentY = 0;

    ngOnChanges(): void {
        if (this.imageFile) {
            this.loadImage();
        }
    }

    private loadImage(): void {
        const url = URL.createObjectURL(this.imageFile);
        this.img.onload = () => {
            this.setupCanvas();
            URL.revokeObjectURL(url);
        };
        this.img.src = url;
    }

    private setupCanvas(): void {
        const canvas = this.canvasEl.nativeElement;
        this.ctx = canvas.getContext("2d")!;

        // Set canvas dimensions while maintaining aspect ratio
        const maxWidth = 800;
        const maxHeight = 600;
        const ratio = Math.min(
            maxWidth / this.img.width,
            maxHeight / this.img.height,
        );

        canvas.width = this.img.width * ratio;
        canvas.height = this.img.height * ratio;

        this.ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
    }

    startSelection(e: MouseEvent): void {
        const canvas = this.canvasEl.nativeElement;
        const rect = canvas.getBoundingClientRect();
        // Calculate scaling factors
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        this.isDrawing = true;
        this.startX = (e.clientX - rect.left) * scaleX;
        this.startY = (e.clientY - rect.top) * scaleY;
        this.currentX = this.startX;
        this.currentY = this.startY;
    }

    drawSelection(e: MouseEvent): void {
        if (!this.isDrawing) return;

        const canvas = this.canvasEl.nativeElement;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        this.currentX = (e.clientX - rect.left) * scaleX;
        this.currentY = (e.clientY - rect.top) * scaleY;

        this.redrawCanvas();
        this.drawSelectionRect();
    }

    endSelection(): void {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        // Calculate selected area coordinates
        const selection = {
            x: Math.min(this.startX, this.currentX),
            y: Math.min(this.startY, this.currentY),
            width: Math.abs(this.currentX - this.startX),
            height: Math.abs(this.currentY - this.startY),
        };

        this.selected.emit(selection);
    }

    private redrawCanvas(): void {
        this.ctx.clearRect(
            0,
            0,
            this.canvasEl.nativeElement.width,
            this.canvasEl.nativeElement.height,
        );
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.canvasEl.nativeElement.width,
            this.canvasEl.nativeElement.height,
        );
    }

    private drawSelectionRect(): void {
        this.ctx.strokeStyle = "#ff0000";
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);

        this.ctx.beginPath();
        this.ctx.rect(
            this.startX,
            this.startY,
            this.currentX - this.startX,
            this.currentY - this.startY,
        );
        this.ctx.stroke();
    }
}
