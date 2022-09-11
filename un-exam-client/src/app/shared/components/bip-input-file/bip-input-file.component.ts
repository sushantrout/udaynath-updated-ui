import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '../bip-shared/bip-value-accessor';

@Component({
  selector: 'bip-input-file',
  templateUrl: './bip-input-file.component.html',
  styleUrls: ['./bip-input-file.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: BipInputFileComponent, multi: true }
  ]
})
export class BipInputFileComponent extends ValueAccessor implements OnInit {

  @Input('optionValue') optionValue !: any;
  @Input('optionLabel') optionLabel !: any;
  @Input('accept') accept !: any;
  @Input('multiple') multiple !: boolean;
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
