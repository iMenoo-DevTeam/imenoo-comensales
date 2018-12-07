import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsNavComponent } from './sections-nav.component';

describe('SectionsNavComponent', () => {
  let component: SectionsNavComponent;
  let fixture: ComponentFixture<SectionsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
