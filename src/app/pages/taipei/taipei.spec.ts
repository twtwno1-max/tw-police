import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taipei } from './taipei';

describe('Taipei', () => {
  let component: Taipei;
  let fixture: ComponentFixture<Taipei>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taipei]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Taipei);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
