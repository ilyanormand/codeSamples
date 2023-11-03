import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfExportSettingsComponent } from './pdf-export-settings.component';
import { SharedModule } from '@app/shared/shared.module';
// import { SubmissionTableModule } from './submission-table/submission-table.module';
import { AnalyticsModule } from '@app/project/project-view/analytics/analytics.module';
import { ReportsModule } from '@app/project/project-view/reports/reports.module';
// import { ResultsModule } from '@app/project/project-view/results/results.module';
import { MatTabsModule } from '@angular/material/tabs';

/* MATERIAL */
import { TabLinksMenuModule } from '@app/shared/tab-links-menu/tab-links-menu.module';
import { PdfExportRoutingModule } from './pdf-settings-routing.module';
import { UploadLogoModule } from '../project-settings/settings/upload-logo/upload-logo.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PdfExportSettingsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    AnalyticsModule,
    ReportsModule,
    TabLinksMenuModule,
    PdfExportRoutingModule,
    UploadLogoModule,
    MatButtonToggleModule,
    MatTooltipModule,
    RouterModule,
  ],
})
export class PdfExportSettingsModule {}
