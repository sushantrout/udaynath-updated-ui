import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-icon',
  templateUrl: './bip-icon.component.html',
  styleUrls: ['./bip-icon.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipIconComponent, multi: true }
  ]
})
export class BipIconComponent extends ValueAccessor implements OnInit {

  @Input('iconClass') iconClass !: string;
  uploadedFiles: any[] = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  changeEvent(event: any) {
    this.changed.forEach((f) => { f(this.value) });
  }
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
}

