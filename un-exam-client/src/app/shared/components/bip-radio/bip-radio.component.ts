import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-radio',
  templateUrl: './bip-radio.component.html',
  styleUrls: ['./bip-radio.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipRadioComponent, multi: true }
  ]
})
export class BipRadioComponent extends ValueAccessor implements OnInit {

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
