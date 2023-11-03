import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExportSettingsComponent } from './pdf-export-settings.component';

describe('PdfExportSettingsComponent', () => {
  let component: PdfExportSettingsComponent;
  let fixture: ComponentFixture<PdfExportSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfExportSettingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfExportSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
