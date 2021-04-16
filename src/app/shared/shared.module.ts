import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AngularMaterialModule } from './angular-material.module';

const components = [
  NavbarComponent,
  PageNotFoundComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  declarations: [components],
  exports: [components]
})
export class SharedModule { }
