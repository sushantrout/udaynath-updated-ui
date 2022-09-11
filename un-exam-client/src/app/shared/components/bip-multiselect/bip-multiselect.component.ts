import { Component, Input, OnInit } from '@angular/core';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'app-bip-multiselect',
  templateUrl: './bip-multiselect.component.html',
  styleUrls: ['./bip-multiselect.component.css']
})
export class BipMultiselectComponent extends ValueAccessor implements OnInit {

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
