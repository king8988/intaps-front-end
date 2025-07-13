import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { NoteToBeCreated, NoteToBeUpdated } from './note.model';
import { FilterParams } from '../../shared/models/FilterParams';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lookupData } from '../../shared/models/response/lookupResponseDto';
import { SESSION_USER_NAME } from '../../shared/components/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private baseService: BaseService) {}

  public getAllNotes(parameter: FilterParams) {
    let params = new HttpParams().set('userName', sessionStorage.getItem(SESSION_USER_NAME) || '');
    params = params.append('pageIndex', parameter.pageIndex);
    params = params.append('pageSize', parameter.pageSize);
  
    return this.baseService.get(`Notes/get-all`, { params });
  }
  public createNote(newNote: NoteToBeCreated) {
    return this.baseService.post('notes/create-note', newNote);
  }

  public editNotes(updatedUser: NoteToBeUpdated) {
    return this.baseService.put('Notes/update', updatedUser);
  }

  public getNotesById(id: string): Observable<any> {
    return this.baseService.get(`notes/get-by-id?id=${id}`);
  }

  public getRoles(): Observable<lookupData[]> {
    return this.baseService.get(`lookups/get-all-roles`);
  }
}
