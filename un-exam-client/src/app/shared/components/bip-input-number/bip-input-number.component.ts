import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-input-number',
  templateUrl: './bip-input-number.component.html',
  styleUrls: ['./bip-input-number.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipInputNumberComponent, multi: true }
  ]
})
export class BipInputNumberComponent extends ValueAccessor implements OnInit {

  @Input('value') type!: number;
  @Input('mode') mode!: string;
  @Input('placeholder') placeholder !:string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }

}
