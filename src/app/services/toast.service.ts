import { Injectable, inject } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = inject(HotToastService);

  constructor() {}

  toastConfig = {
    duration: 2000,
    position: 'top-right' as ToastPosition,
    style: {
      border: '1px solid #27272A',
      borderRadius: '12px',
      padding: '16px',
      color: 'white',
      backgroundColor: '#121212',
    },
  };

  Success(message: string) {
    this.toast.success(message, {
      ...this.toastConfig,
    });
  }

  Error(message: string) {
    this.toast.error(message, {
      ...this.toastConfig,
    });
  }

  Info(message: string) {
    this.toast.info(message, {
      ...this.toastConfig,
    });
  }

  Warning(message: string) {
    this.toast.warning(message, {
      ...this.toastConfig,
    });
  }

  Loading(message: string) {
    this.toast.loading(message, {
      ...this.toastConfig,
    });
  }
}
