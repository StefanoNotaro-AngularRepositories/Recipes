import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

const components = [
  NavbarComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [components],
  exports: [components]
})
export class SharedModule { }
