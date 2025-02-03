import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsDisplayComponent } from './receipts-display.component';

describe('ReceiptsDisplayComponent', () => {
  let component: ReceiptsDisplayComponent;
  let fixture: ComponentFixture<ReceiptsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptsDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiptsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
