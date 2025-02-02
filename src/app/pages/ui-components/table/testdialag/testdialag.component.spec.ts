import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdialagComponent } from './testdialag.component';

describe('TestdialagComponent', () => {
  let component: TestdialagComponent;
  let fixture: ComponentFixture<TestdialagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestdialagComponent]
    });
    fixture = TestBed.createComponent(TestdialagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
