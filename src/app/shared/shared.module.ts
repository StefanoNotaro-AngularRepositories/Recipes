import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const components = [
  NavbarComponent,
  PageNotFoundComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [components],
  exports: [components]
})
export class SharedModule { }
