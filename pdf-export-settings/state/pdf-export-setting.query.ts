import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PdfExportStore, PdfExportState } from './pdf-export-setting.store';

@Injectable({ providedIn: 'root' })
export class PdfExportQuery extends Query<PdfExportState> {
  state$ = this.select(state => state);
  submission$ = this.select(state => state.submissionInfo);
  constructor(protected store: PdfExportStore) {
    super(store);
  }
}
