import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceDemoComponent } from './voice-demo.component';

describe('VoiceDemoComponent', () => {
  let component: VoiceDemoComponent;
  let fixture: ComponentFixture<VoiceDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
