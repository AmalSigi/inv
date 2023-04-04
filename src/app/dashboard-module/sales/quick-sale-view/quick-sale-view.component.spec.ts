import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSaleViewComponent } from './quick-sale-view.component';

describe('QuickSaleViewComponent', () => {
  let component: QuickSaleViewComponent;
  let fixture: ComponentFixture<QuickSaleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSaleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSaleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
