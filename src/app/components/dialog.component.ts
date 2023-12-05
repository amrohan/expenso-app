import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from '../services/icon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styles: ``
})
export class DialogComponent implements OnInit {
  @Input({ required: true }) title: string;
  @Input() isDialogOpen: boolean
  @Input() btnName: string;
  @Input() btnColor: string;
  @Input() zIndex: string;
  // Icons
  @Input() isIconOpen: boolean = true;


  @Output() closeDialogEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() confrimDialogEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() openIconDialogEvent: EventEmitter<boolean> = new EventEmitter()

  // vars
  iconList$: Observable<any>;

  iconService = inject(IconService);


  ngOnInit(): void {
    if (this.isIconOpen) {
      this.iconList$ = this.iconService.getIcons()
    }
  }

  closeDialog(value: boolean) {
    this.closeDialogEvent.emit(true);
  }

  onConfrimDialog(value: boolean) {
    this.confrimDialogEvent.emit(true);
  }

  openIconDialog(value: boolean) {
    this.openIconDialogEvent.emit(true);
    this.iconList$ = this.iconService.getIcons()
  }

  onIoncSelect(value: string) {
    console.log("🚀 ~ file: dialog.component.ts:53 ~ DialogComponent ~ onIoncSelect ~ value:", value)

  }
}
