import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsUploadComponent } from './receipts-upload.component';

describe('ReceiptsUploadComponent', () => {
  let component: ReceiptsUploadComponent;
  let fixture: ComponentFixture<ReceiptsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptsUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
