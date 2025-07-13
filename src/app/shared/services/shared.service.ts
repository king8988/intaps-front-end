import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

import { serverUrl } from '../../../environments/environment';
import { UploadAttachmentResponse } from '../models/UploadAttachmentResponse';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private http: BaseService) { }

    public uploadAttachment(request: FormData): Observable<UploadAttachmentResponse> {
        return this.http.post('attachment/create-attachment', request);
    }

    public removeAttachment(id: number): Observable<any> {
        return this.http.delete(`attachment/${id}`);
    }

    public updateAttachment(request: FormData): Observable<any> {
        return this.http.put(`attachment/update-attachment`, request);
    }

    public viewAttachment(filePath: string): void {
        const fullPath = serverUrl.concat(filePath);
        window.open(fullPath);
    }
}
