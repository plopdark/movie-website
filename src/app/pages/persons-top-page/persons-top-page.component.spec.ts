import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsTopPageComponent } from './persons-top-page.component';

describe('PesonsTopPageComponent', () => {
  let component: PersonsTopPageComponent;
  let fixture: ComponentFixture<PersonsTopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonsTopPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonsTopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
