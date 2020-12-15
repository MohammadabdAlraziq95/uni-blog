import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvenytsComponent } from './add-evenyts.component';

describe('AddEvenytsComponent', () => {
  let component: AddEvenytsComponent;
  let fixture: ComponentFixture<AddEvenytsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvenytsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvenytsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
