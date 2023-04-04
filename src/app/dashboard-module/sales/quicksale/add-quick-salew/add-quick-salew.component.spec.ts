import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickSalewComponent } from './add-quick-salew.component';

describe('AddQuickSalewComponent', () => {
  let component: AddQuickSalewComponent;
  let fixture: ComponentFixture<AddQuickSalewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuickSalewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuickSalewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
