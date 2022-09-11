import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-text-area',
  templateUrl: './bip-text-area.component.html',
  styleUrls: ['./bip-text-area.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipTextAreaComponent, multi: true }
  ]
})
export class BipTextAreaComponent extends ValueAccessor implements OnInit {

  @Input('rows') rows !: number;
  @Input('cols') cols !: number;
  @Input('autoResize') autoResize !: boolean;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }
}

