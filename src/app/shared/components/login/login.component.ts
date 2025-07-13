import { Component, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { loginRequestDto } from '../../models/request/authRequestDto';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { InterceptorError } from '../../models/interceptorErrorDto';
import { TOAST_LIFETIME } from '../constants/constant';
import { SESSION_TOKEN_KEY } from '../constants/constant';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    InputTextModule,
    CommonModule,
    RippleModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSubmitted: boolean = false;

  loginForm = this.fb.group({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {

  }

  login() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Make sure username and password is filled in!',
        key: 'submitFormToast',
        life: TOAST_LIFETIME,
      });
      return;
    }

    const loginValue: loginRequestDto = {
      username: this.loginForm.controls.username.value || '',
      password: this.loginForm.controls.password.value || ''
    }

    this.isSubmitted = true;
    
    this.authService
      .login(loginValue)
      .pipe(
        finalize(() => {
          this.isSubmitted = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
.subscribe({
  next: (res: any) => {
     // Save token to sessionStorage
      if (res.token) {
        sessionStorage.setItem(SESSION_TOKEN_KEY, res.token);
      console.log('Token set:', sessionStorage.getItem(SESSION_TOKEN_KEY));
      }
      this.authService.onLoginSuccess(res);  
      console.log('Navigating to dashboard...');this.router.navigateByUrl('dashboard');
  },

        error: (errorIntercepted: InterceptorError[]) => {
          errorIntercepted.forEach(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error Logging in',
              detail: error.message,
              key: 'submitFormToast',
              life: TOAST_LIFETIME,
            });
          });
        },
      });
  }
}
