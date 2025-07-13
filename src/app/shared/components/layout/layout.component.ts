import { Component, ViewChild } from '@angular/core';
import { ImportsModule } from './layout.imports';
import { RouterOutlet } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    ImportsModule,
    RouterOutlet,
    ImageModule,
    StyleClassModule,
    RippleModule,
    BadgeModule,
    OverlayBadgeModule,
    RouterModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  users: string = '/notes';
}
