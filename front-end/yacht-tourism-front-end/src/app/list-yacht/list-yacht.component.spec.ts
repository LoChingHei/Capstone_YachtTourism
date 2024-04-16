import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYachtComponent } from './list-yacht.component';

describe('ListYachtComponent', () => {
  let component: ListYachtComponent;
  let fixture: ComponentFixture<ListYachtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListYachtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListYachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
