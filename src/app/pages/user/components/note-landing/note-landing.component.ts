import { Component, DestroyRef, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { UserService } from '../../note.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterParams } from '../../../../shared/models/FilterParams';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Note } from '../../note.model';

interface Status {
  value: string;
  label: string;
}

@Component({
  selector: 'app-user-landing',
  templateUrl: './note-landing.component.html',
  styleUrl: './note-landing.component.scss',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    InputTextModule,
    TagModule,
    SelectModule,
    ButtonModule,
    Menu,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    HeaderComponent,
  ],
  providers: [UserService],
})
export class UserLandingComponent implements OnInit {
  breadCrumbList: MenuItem[] | undefined;
  pageTitle: string = 'Notes';
  pageDescription: string = 'List of Registered User Notes';

  userMenuItems: MenuItem[] | undefined;

  searchValue: string | undefined;
  loading: boolean = true;
  statuses!: Status[];

  filterParams = new FilterParams();

  selectedNote: Note | undefined = undefined;

  notes!: Note[];
  // value!: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.breadCrumbList = [
      { url: '/notes', icon: 'pi pi-user', title: 'Notes' },
    ];

    this.userMenuItems = [
      {
        label: 'View Detail',
        icon: 'pi pi-eye',
        command: () => {
          this.goToViewDetail(this.selectedNote?.id || '');
        },
      },

      {
        label: 'Update',
        icon: 'pi pi-user-edit',
        command: () => {
          this.goToUpdate(this.selectedNote?.id || '');
        },
      },
    ];

    this.userService
      .getAllNotes(this.filterParams)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res: any) => {
                      this.notes = res.notes;

        },
        error: (error: any) => {
          // this.message.create('error',error.message)
        },
      });
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  addUser() {
    this.router.navigateByUrl('/notes/register');
  }

  goToViewDetail(userId: string) {
        // this.router.navigate(['/users/view'], { queryParams: { id: userId } });

  }

  goToUpdate(userId: string) {
    this.router.navigate(['/notes/update'], { queryParams: { id: userId } });
  }

  getSeverity(status: string) {
    if (status.toLowerCase() == 'active') {
      return 'success';
    } else if (status.toLowerCase() == 'inactive') {
      return 'danger';
    }
    return 'info';
  }
}
