import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex justify-between w-full items-center p-2 ">
      <!-- Routes -->
      @if(activeRoute !== 'edit' && activeRoute !== 'add'){

      <div
        class="flex justify-start items-center gap-1 text-sm dark:bg-zinc-900 bg-slate-200 rounded-md p-1"
      >
        <a
          routerLink="/"
          [ngClass]="{
            'dark:bg-zinc-700 bg-slate-50 rounded-md': activeRoute === ''
          }"
          class="p-2"
        >
          Transaction
        </a>
        <a
          routerLink="/category"
          [ngClass]="{
            'dark:bg-zinc-700 bg-slate-50  rounded-md':
              activeRoute === 'category'
          }"
          class="p-2"
        >
          Category
        </a>
        <a
          routerLink="/account"
          [ngClass]="{
            'dark:bg-zinc-700 bg-slate-50 rounded-md': activeRoute === 'account'
          }"
          class="p-2"
        >
          Account
        </a>
      </div>
      <div class="flex justify-end items-center w-full relative gap-1">
        <!-- Theme -->
        @if (themeService.isDarkMode()) {
        <button
          (click)="themeService.setDarkMode(!themeService.isDarkMode())"
          class="rounded-md p-2 hover:dark:bg-zinc-800 hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
            class="size-5"
          >
            <path
              d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"
            />
          </svg>
        </button>
        }@else {
        <button
          (click)="themeService.setDarkMode(!themeService.isDarkMode())"
          class="rounded-md p-2 hover:dark:bg-zinc-800 hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
            class="size-5"
          >
            <path
              d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
            />
          </svg>
        </button>
        }

        <!-- Settings -->
        <button
          (click)="setMenu()"
          class="rounded-md p-2 hover:dark:bg-zinc-800 hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        <!-- Menu -->
        @if (showMenu) {

        <div
          class="h-24 w-32 animate-fade animate-duration-[100ms] dark:bg-zinc-800 absolute z-50 top-10 rounded-md shadow-2xl text-sm border dark:border-zinc-700 bg-white"
        >
          <!-- Profile -->
          <a
            class="flex justify-start items-center gap-2 p-3"
            routerLink="/profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-5"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Profile
          </a>
          <hr
            class="h-px mt-1 border-0 dark:bg-zinc-700 bg-zinc-300 w-28 mx-auto"
          />

          <!-- Logout -->
          <button
            (click)="logOut()"
            class="flex justify-start items-center gap-2 p-3 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Logout
          </button>
        </div>
        }
      </div>

      }
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  showMenu: boolean = false;

  public readonly themeService = inject(ThemeService);
  route = inject(ActivatedRoute);
  auth = inject(AuthService);
  router = inject(Router);

  activeRoute: string = '';
  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.activeRoute = url[0].path;
    });
  }

  logOut() {
    this.auth.LogoutUser();
    this.router.navigate(['/login']);
  }
  setMenu() {
    this.showMenu = !this.showMenu;
  }
}
