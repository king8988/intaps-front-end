import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { loginRequestDto } from '../models/request/authRequestDto';
import { authResponseDto } from '../models/response/authResponseDto';
import { apiResponseDto } from '../models/response/apiResponse';
import { JwtHelperService } from "@auth0/angular-jwt";
import { SESSION_TOKEN_KEY, SESSION_USER_ID, SESSION_USER_NAME, SESSION_USER_ROLES_KEY } from '../components/constants/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: BaseService) {}

  public login(credential: loginRequestDto): Observable<apiResponseDto<authResponseDto>> {
    return this.http.post(`auth/login`, credential);
  }

  public onLoginSuccess(userInfo?: authResponseDto) {
    if (userInfo) {
      sessionStorage.setItem(SESSION_TOKEN_KEY, userInfo.token);
      sessionStorage.setItem(SESSION_USER_ID, userInfo.userId);
      sessionStorage.setItem(SESSION_USER_NAME, userInfo.userName);
      sessionStorage.setItem(SESSION_USER_ROLES_KEY, JSON.stringify(userInfo.roles));
    }
  } 
}
