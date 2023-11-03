import { Injectable, Inject } from '@angular/core';
import { PdfExportStore } from './pdf-export-setting.store';
import { PdfField } from '../types/pdfField';
import { HttpClient } from '@angular/common/http';
import { ENVIRONMENT } from '@app/core/services/environment.factory';
import { InjectionTokenType } from '@app/core/utility-types';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  constructor(
    private pdfExportStore: PdfExportStore,
    @Inject(ENVIRONMENT) private env: InjectionTokenType<typeof ENVIRONMENT>,
    private http: HttpClient,
  ) {}
  setFields(newFields: PdfField[], updated: boolean) {
    this.pdfExportStore.update(() => {
      return {
        fields: newFields,
        updated,
      };
    });
  }

  setSubmission(newSubmissions, updated: boolean) {
    this.pdfExportStore.update(() => {
      return {
        submissionInfo: newSubmissions,
        updated,
      };
    });
  }

  public getSubmission(projectId: string) {
    return this.http.get<any>(`${this.env.apiUrl}/projects/${projectId}/submissions/info-to-hide`);
  }

  public savePdfRequiredFields(projectId: string, pdfRequiredFields) {
    return this.http.post<any>(`${this.env.apiUrl}/projects/${projectId}/submissions/info-to-hide`, { pdfRequiredFields });
  }
}
