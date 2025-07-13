// Import PrimeNG modules
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
    imports: [
        DrawerModule,
        ButtonModule,
        AvatarModule,
        AvatarGroupModule
    ],
    exports: [
        DrawerModule,
        ButtonModule,
        AvatarModule,
        AvatarGroupModule
    ],
    providers: []
})
export class ImportsModule { 
}