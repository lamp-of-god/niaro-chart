import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'chart-task-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.styl'],
})

/**
 * Form to add currency.
 */
export class AddCurrencyComponent implements OnInit {
  /** List of currencies available to chose. */
  @Input() availableCurrencies: string[] = [];
  /** Emits when currency has been chosen. */
  @Output() add = new EventEmitter();

  /** Currently selected currency */
  selected: string = null;

  ngOnInit(): void {}

  /** Emits currency if it was selected. */
  addCurrency() {
    if (this.selected) {
      this.add.emit(this.selected);
    }
    this.selected = null;
  }
}
