import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  NavbarComponent,
  PageNotFoundComponent,
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [components],
  exports: [
    components,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule]
})
export class SharedModule { }
