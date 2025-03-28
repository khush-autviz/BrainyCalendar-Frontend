import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export enum Mode {
  LIGHT = 'light-mode',
  DARK = 'dark-mode'
}

@Component({
  selector: 'app-theme-btn',
  templateUrl: './theme-btn.component.html',
  styleUrls: ['./theme-btn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeBtnComponent {
  currentMode: Mode = Mode.LIGHT;

  // Expose the Mode enum to the template
  Mode = Mode;

  constructor(@Inject(DOCUMENT) private document: Document, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const savedMode = localStorage.getItem('themeMode') as Mode;
    if (savedMode) {
      this.currentMode = savedMode;
    } 
    this.applyMode(this.currentMode);
  }

  toggleMode() {
    const newMode = this.currentMode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT;
    this.applyMode(newMode);
    this.updateCurrentMode(newMode);
    localStorage.setItem('themeMode', newMode);
  }

  private applyMode(mode: Mode) {
    if (mode === Mode.DARK) {
      this.document.body.classList.remove(Mode.LIGHT);
      this.document.body.classList.add(Mode.DARK);
    } else {
      this.document.body.classList.remove(Mode.DARK);
      this.document.body.classList.add(Mode.LIGHT);
    }
  }

  private updateCurrentMode(mode: Mode) {
    this.currentMode = mode;
    this.cdr.detectChanges();
  }
}
