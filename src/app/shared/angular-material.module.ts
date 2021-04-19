import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

const angularMaterialModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
];

@NgModule({
  imports: [CommonModule, angularMaterialModules],
  exports: [angularMaterialModules]
})
export class AngularMaterialModule { }