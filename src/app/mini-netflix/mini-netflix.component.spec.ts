import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniNetflixComponent } from './mini-netflix.component';

describe('MiniNetflixComponent', () => {
  let component: MiniNetflixComponent;
  let fixture: ComponentFixture<MiniNetflixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniNetflixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniNetflixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
