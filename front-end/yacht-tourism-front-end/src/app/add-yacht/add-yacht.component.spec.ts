import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYachtComponent } from './add-yacht.component';

describe('AddYachtComponent', () => {
  let component: AddYachtComponent;
  let fixture: ComponentFixture<AddYachtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddYachtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddYachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
