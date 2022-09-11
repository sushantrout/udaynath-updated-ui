import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-checkbox',
  templateUrl: './bip-checkbox.component.html',
  styleUrls: ['./bip-checkbox.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipCheckboxComponent, multi: true }
  ]
})
export class BipCheckboxComponent extends ValueAccessor implements OnInit {

  @Input('optionValue') optionValue !: any;
  @Input('optionLabel') optionLabel !: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }
}
