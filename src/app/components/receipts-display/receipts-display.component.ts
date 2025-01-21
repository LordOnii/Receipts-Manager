import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-receipts-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipts-display.component.html',
  styleUrl: './receipts-display.component.css'
})
export class ReceiptsDisplayComponent {
  public receipts: {id:number,image:string,category:string,date:string}[] = []

  public sortReceipt(id: number) {

  }
}
