import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketEmplouyeePageComponent } from './market-emplouyee-page.component';

describe('MarketEmplouyeePageComponent', () => {
  let component: MarketEmplouyeePageComponent;
  let fixture: ComponentFixture<MarketEmplouyeePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketEmplouyeePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketEmplouyeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
