import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPanComponent } from './book-pan.component';

describe('BookPanComponent', () => {
  let component: BookPanComponent;
  let fixture: ComponentFixture<BookPanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookPanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
