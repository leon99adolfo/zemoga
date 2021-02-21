import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVotesComponent } from './main-votes.component';

describe('MainVotesComponent', () => {
  let component: MainVotesComponent;
  let fixture: ComponentFixture<MainVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
