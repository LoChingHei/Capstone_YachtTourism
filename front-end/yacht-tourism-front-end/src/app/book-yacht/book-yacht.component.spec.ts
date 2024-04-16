import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookYachtComponent } from './book-yacht.component';

describe('BookYachtComponent', () => {
  let component: BookYachtComponent;
  let fixture: ComponentFixture<BookYachtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookYachtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookYachtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
