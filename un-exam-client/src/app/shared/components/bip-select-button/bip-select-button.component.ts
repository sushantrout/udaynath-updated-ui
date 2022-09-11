import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'app-bip-select-button',
  templateUrl: './bip-select-button.component.html',
  styleUrls: ['./bip-select-button.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipSelectButtonComponent, multi: true }
  ]
})
export class BipSelectButtonComponent extends ValueAccessor implements OnInit {

  @Input('optionValue') optionValue !: any;
  @Input('optionLabel') optionLabel !: any;
  @Input('optionList') optionList !: any;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }


}
