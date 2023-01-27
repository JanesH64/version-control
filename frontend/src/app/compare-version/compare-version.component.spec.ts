import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareVersionComponent } from './compare-version.component';

describe('CompareVersionComponent', () => {
  let component: CompareVersionComponent;
  let fixture: ComponentFixture<CompareVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
