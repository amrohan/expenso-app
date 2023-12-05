import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconService {

  iconUrl = 'https://icons.amrohan.workers.dev/icons'

  private readonly http = inject(HttpClient)

  getIcons(): Observable<string[]> {
    return this.http.get<string[]>(this.iconUrl)
  }
}
