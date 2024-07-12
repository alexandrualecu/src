import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { Observable, from } from 'rxjs';
import { IServiceSettings } from '../../typings/settings';

@Injectable()
export class ApplyService {

  private service: IServiceSettings;

  public constructor(private http: HttpClient, public settings: SettingsService) {
    this.service = SettingsService.settings.service;
  }

  get candidateInfoURL(): string {
    return `${this.service.apply.baseUrl}${this.service.apply.candidateInfo}`;
  }
  get candidateAttachmentsURL(): string {
    return `${this.service.apply.baseUrl}${this.service.apply.candidateAttachments}`;
  }

  public apply(jobId: number, candidateInfo: any, file: File): Observable<any> {
    let headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.service.apply.apiKey,
    };
    try {
      let fileContentPromise = this.base64(file);
      return from(
        this.http.post(this.candidateInfoURL, candidateInfo, { headers }).toPromise()
        // Promise.resolve({
        //   "status": {
        //     "status_code": 200
        //   },
        //   "data": {
        //     "Candidate_ID": 636979,
        //     "JobSubmission_ID":342980
        //   }
        // })
          .then((response: any) => {
            if (response?.status?.status_code !== 200) {
              throw new Error('Unable to apply for job: ' + response?.status?.status_code);
            }
            let {Candidate_ID: candidateId, JobSubmission_ID: jobSubmissionId} = response?.data || {};
            if (!candidateId || !jobSubmissionId) {
              throw new Error('Unable to apply for job: ' + response);
            }
            return fileContentPromise.then((content: string) => {
              let attachmentBody = {
                'source-country': 'ro',
                'source-label': 'Manpower',
                'candidate_id': candidateId + '',
                'filename': file.name,
                'attachment_type': 'CV',
                'content': content,
              };
              return this.http.post(this.candidateAttachmentsURL, attachmentBody, { headers }).toPromise().then((attachmentResponse: any) => {
                if (attachmentResponse?.status?.status_code !== 200) {
                  throw new Error('Unable to apply for job: ' + attachmentResponse?.status?.status_code);
                }
                let fileId = attachmentResponse?.data?.File_ID;
                return Promise.resolve({ candidateId, jobSubmissionId, fileId });
              });
            });
          }));
    } catch (error) {
      throw Observable.throw(error?.message || String(error));
    }
  }

  private base64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64WithContentType = reader.result as string;
        let base64 = base64WithContentType.toString().replace(/^data:(.*,)?/, '');
        base64 += '='.repeat(4 - (base64.length % 4));
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

}
