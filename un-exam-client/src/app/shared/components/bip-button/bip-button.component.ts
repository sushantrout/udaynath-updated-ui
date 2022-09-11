import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-button',
  templateUrl: './bip-button.component.html',
  styleUrls: ['./bip-button.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipButtonComponent, multi: true }
  ]
})
export class BipButtonComponent extends ValueAccessor implements OnInit {

  @Input('label') label !: string;
  @Input('icon') icon!: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }

}
