import { Component, DestroyRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormBuilder,FormControl,ReactiveFormsModule, Validators,} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { MessageModule } from 'primeng/message';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../note.service';
import { NoteToBeUpdated } from '../../note.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { lookupData } from '../../../../shared/models/response/lookupResponseDto';
import { SESSION_USER_NAME } from '../../../../shared/components/constants/constant';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
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
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  breadCrumbList: MenuItem[] | undefined;
  pageTitle: string = 'Update Note';
  pageDescription: string = 'Update Note Data';

  isSubmitted: boolean = false;
  isLoading: boolean = true;

  roles: lookupData[] | undefined;

  id!: string;

  noteCreateForm = this.fb.group({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.breadCrumbList = [
      { url: '/notes', icon: 'pi pi-user', title: 'Notes' },
      { url: '/notes/register', icon: 'pi pi-user', title: 'Update Notes' },
    ];

    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: any) => {
        this.id = res['id'];
      },
    });

    this.userService
      .getNotesById(this.id)
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res: any) => {
            this.noteCreateForm.patchValue({
              title: res.title,
              content: res.content
            });
            this.noteCreateForm.updateValueAndValidity();
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

  clearForm() {}

  updateNote() {
    const form = this.noteCreateForm.getRawValue();

    const request: NoteToBeUpdated = {
      id: this.id,
      title: form.title!,
      content: form.content!,
      updatedBy: sessionStorage.getItem(SESSION_USER_NAME) || ''
    };

    this.isSubmitted = true;

    this.userService
      .editNotes(request)
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
              detail: 'Note Data Updated Successfully',
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
