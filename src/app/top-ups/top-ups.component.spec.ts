import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpsComponent } from './top-ups.component';

describe('TopUpsComponent', () => {
  let component: TopUpsComponent;
  let fixture: ComponentFixture<TopUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
