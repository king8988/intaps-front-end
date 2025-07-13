import { Component, Input, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    BreadcrumbModule,
    RouterModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input() breadCrumbList:MenuItem[] | undefined = [];
  @Input() title: string | undefined = '';
  @Input() description: string | undefined = '';
  items: MenuItem[] | undefined = [];
  home: MenuItem | undefined;

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.items = this.breadCrumbList;
    this.home = { url: '/dashboard', icon: 'pi pi-home' };
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
