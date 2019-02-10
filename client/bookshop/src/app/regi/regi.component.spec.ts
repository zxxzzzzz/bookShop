import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiComponent } from './regi.component';

describe('RegiComponent', () => {
  let component: RegiComponent;
  let fixture: ComponentFixture<RegiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
