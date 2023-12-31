import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
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
  @Input() isIconOpen: boolean = false;



  @Output() closeDialogEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() confrimDialogEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() openIconDialogEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() iconSelectEvent: EventEmitter<string> = new EventEmitter()
  @Output() iconCloseEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() iconConfirmEvent: EventEmitter<boolean> = new EventEmitter()

  // vars
  iconList$: Observable<any>;
  selectedIcon: string;
  iconService = inject(IconService);


  ngOnInit(): void {
    this.iconList$ = this.iconService.getIcons()
  }



  closeDialog(value: boolean) {
    this.closeDialogEvent.emit(true);
  }

  onConfrimDialog(value: boolean) {
    this.confrimDialogEvent.emit(value);
  }


  openIconDialog(value: boolean) {
    this.openIconDialogEvent.emit(true);
    this.iconList$ = this.iconService.getIcons()
  }

  onIconSelect(value: string) {
    this.selectedIcon = value;
  }

  onConfirmIconSelect(value: boolean) {
    this.iconSelectEvent.emit(this.selectedIcon);
    this.iconCloseEvent.emit(value)
    this.iconConfirmEvent.emit(value)
  }

  onIconClose(value: boolean) {
    this.iconCloseEvent.emit(value);
  }



}
