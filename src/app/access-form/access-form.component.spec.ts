import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessFormComponent } from './access-form.component';

describe('AccessFormComponent', () => {
  let component: AccessFormComponent;
  let fixture: ComponentFixture<AccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
