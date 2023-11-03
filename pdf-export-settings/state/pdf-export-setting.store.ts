import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Submission } from '@mightyforms/common/types/submission';
import { PdfField } from '../types/pdfField';

export interface PdfExportState {
  fields: PdfField[];
  submissionInfo;
  updated: boolean;
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pdf-export-settings' })
export class PdfExportStore extends Store<PdfExportState> {
  constructor() {
    super({
      fields: [],
      submissionInfo: [],
    });
  }
}
