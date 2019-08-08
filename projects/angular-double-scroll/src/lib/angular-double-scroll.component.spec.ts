import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDoubleScrollComponent } from './angular-double-scroll.component';

describe('AngularDoubleScrollComponent', () => {
  let component: AngularDoubleScrollComponent;
  let fixture: ComponentFixture<AngularDoubleScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDoubleScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDoubleScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
