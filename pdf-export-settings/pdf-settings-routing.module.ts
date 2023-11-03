import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfExportSettingsComponent } from './pdf-export-settings.component';

const routes: Routes = [
  {
    path: '',
    component: PdfExportSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfExportRoutingModule {}
