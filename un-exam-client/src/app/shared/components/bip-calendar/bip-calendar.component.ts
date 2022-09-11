import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-calendar',
  templateUrl: './bip-calendar.component.html',
  styleUrls: ['./bip-calendar.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipCalendarComponent, multi: true }
  ]
})
export class BipCalendarComponent extends ValueAccessor implements OnInit {

  @Input('showTime') showTime !: boolean;
  @Input('showSeconds') showSeconds !: boolean;
  @Input('showIcon') showIcon !: boolean;
  @Input('placeholder') placeholder !: string;
  @Input('appendTo') appendTo !:any;
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }

}
