import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-dropdown',
  templateUrl: './bip-dropdown.component.html',
  styleUrls: ['./bip-dropdown.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipDropdownComponent, multi: true }
  ]
})
export class BipDropdownComponent extends ValueAccessor implements OnInit {


  @Input('option') option !: any;
  @Input('optionLabel') optionLabel !: string;
  @Input('placeholder') placeholder!: string;
  @Input('inputType') inputType !: string;
  @Input('optionValue') optionValue !: string;
  @Input('disabled') disabled !: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }

}
