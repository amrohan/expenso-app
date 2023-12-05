import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
  <section class="dark:bg-black dark:text-slate-50 bg-white h-screen w-full overflow-x-hidden relative">
    <div class="max-w-5xl mx-auto relative">
      <app-navbar></app-navbar>
      <ng-content></ng-content>
    </div>
  </section>
  `,
  styles: ``
})
export class LayoutComponent {

}
