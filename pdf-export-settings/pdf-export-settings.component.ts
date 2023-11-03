import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BuilderPageQuery, BuilderPageService, BuilderPageStore } from '@app/project/builder-page/state';
import { PdfExportQuery } from './state/pdf-export-setting.query';
import { PdfExportService } from './state/pdf-export-setting.service';
import { Field } from '@app/core/interfaces';
import { PdfField } from './types/pdfField';
import { Steps, StepItem } from '@mightyforms/common/types/steps';

@Component({
  selector: 'app-pdf-export-settings',
  templateUrl: './pdf-export-settings.component.html',
  styleUrls: ['./pdf-export-settings.component.scss'],
})
export class PdfExportSettingsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  projectId: string;
  public builderFields: Array<Field>;
  public builderSteps: Steps;
  public fields: PdfField[];
  public builderFieldsClone: Array<Field>;
  public steps: StepItem[];
  public submissionInfo;
  public pdfRequiredFields;

  constructor(
    private activatedRouter: ActivatedRoute,
    private builderPageQuery: BuilderPageQuery,
    public builderPageService: BuilderPageService,
    public builderPageStore: BuilderPageStore,
    public pdfExportService: PdfExportService,
    public pdfExportQuery: PdfExportQuery,
  ) {
    this.activatedRouter.parent.parent.params.pipe(takeUntil(this.destroy$)).subscribe(({ projectId }) => {
      this.projectId = projectId;
    });
  }

  ngOnInit(): void {
    // get all fields from
    this.builderPageQuery.fields$.subscribe(data => {
      this.builderFields = data?.map(item => {
        return { ...item, hide: item?.hide || false };
      });
      this.fields = data?.map(item => {
        return { label: item?.properties?.label, hide: item?.hide || false, id: item.id, type: item.type, handlerType: 'field' };
      });
      this.builderFieldsClone = [...this.builderFields];
    });
    // get steps
    this.builderPageQuery.steps$.subscribe(data => {
      this.builderSteps = data;
      this.steps = data.stepData;
    });

    this.pdfExportService.getSubmission(this.projectId).subscribe(data => {
      this.submissionInfo = [
        {
          text: 'Submission id',
          hide: data?.pdfRequiredFields?.pdfRequiredFields?.submissionId || false,
          type: 'submissionId',
          handlerType: 'submission',
        },
        {
          text: 'Submission status',
          hide: data?.pdfRequiredFields?.pdfRequiredFields?.submissionStatus || false,
          type: 'submissionStatus',
          handlerType: 'submission',
        },
        {
          text: 'Submission date',
          hide: data?.pdfRequiredFields?.pdfRequiredFields?.submissionDate || false,
          type: 'submissionDate',
          handlerType: 'submission',
        },
      ];
      this.pdfRequiredFields = {
        submissionId: data?.pdfRequiredFields?.pdfRequiredFields?.submissionId,
        submissionStatus: data?.pdfRequiredFields?.pdfRequiredFields?.submissionStatus,
        submissionDate: data?.pdfRequiredFields?.pdfRequiredFields?.submissionDate,
      };
    });
  }

  buttonClickHandler(field: PdfField) {
    // send post request to backend
    field.hide = !field.hide;
    switch (field.handlerType) {
      case 'field':
        this.hideFields(field);
        break;
      case 'submission':
        this.hideSubmissionInfo(field);
        break;
      default:
        field.hide = !field.hide;
        break;
    }
  }

  hideSubmissionInfo(field) {
    this.pdfRequiredFields = { ...this.pdfRequiredFields, [field?.type]: field?.hide };
    const result = this.pdfExportService.savePdfRequiredFields(this.projectId, this.pdfRequiredFields);
    result.subscribe(data => {});
  }

  hideFields(field) {
    this.builderFieldsClone.forEach(item => {
      if (item.id === field.id) {
        item.hide = field.hide;
      }
    });
    const savedFields = this.builderPageService.saveFields(
      this.projectId,
      { fields: this.builderFieldsClone, steps: this.builderSteps },
      this.fields,
    );
    savedFields.subscribe(data => {
      this.pdfExportService.setFields(this.fields, false);
    });
  }

  ngOnDestroy() {
    this.builderPageService.setFields(this.builderFieldsClone);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
