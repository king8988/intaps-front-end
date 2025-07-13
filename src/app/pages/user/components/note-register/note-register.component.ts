import { Component, DestroyRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { UserService } from '../../note.service';
import { NoteToBeCreated } from '../../note.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { lookupData } from '../../../../shared/models/response/lookupResponseDto';
import { SESSION_USER_NAME } from '../../../../shared/components/constants/constant';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    MultiSelectModule,
    CheckboxModule,
    InputMaskModule,
    RippleModule,
    MessageModule,
    HeaderComponent,
  ],
  templateUrl: './note-register.component.html',
  styleUrl: './note-register.component.scss',
})
export class UserRegisterComponent implements OnInit {
  breadCrumbList: MenuItem[] | undefined;
  pageTitle: string = 'Create Note';
  pageDescription: string = 'Create User Note';

  isSubmitted: boolean = false;

  roles: lookupData[] | undefined;

  userRegForm = this.fb.group({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private userService: UserService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.breadCrumbList = [
      { url: '/notes', icon: 'pi pi-user', title: 'Notes' },
      { url: '/notes/register', icon: 'pi pi-user', title: 'Create User Note' },
    ];
  }

  clearForm() {}

  submitForm() {
    const form = this.userRegForm.getRawValue(); 

    const request: NoteToBeCreated = {
      title: form.title!,
      content: form.content!,
      createdBy: sessionStorage.getItem(SESSION_USER_NAME) || '',
    };

    this.isSubmitted = true;

    this.userService
      .createNote(request)
      .pipe(
        finalize(() => (this.isSubmitted = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Note Created Successfully',
              key: 'submitFormToast',
              life: 3000,
            });
            this.router.navigateByUrl('/notes');
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An Error Occurred',
              key: 'submitFormToast',
              life: 3000,
            });
          }
        },

        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            key: 'submitFormToast',
            life: 3000,
          });
        },
      });
  }
}
