import { NgModule } from '@angular/core';
import { BipLabelComponent } from '../bip-label/bip-label.component';
import { BipRadioComponent } from '../bip-radio/bip-radio.component';
import { BipCheckboxComponent } from '../bip-checkbox/bip-checkbox.component';
import { BipSelectButtonComponent } from '../bip-select-button/bip-select-button.component';
import { BipInputTextComponent } from '../bip-input-text/bip-input-text.component';
import { BipInputNumberComponent } from '../bip-input-number/bip-input-number.component';
import { BipInputFileComponent } from '../bip-input-file/bip-input-file.component';
import { BipDataGridComponent } from '../bip-data-grid/bip-data-grid.component';
import { BipDropdownComponent } from '../bip-dropdown/bip-dropdown.component';
import { BipMultiselectComponent } from '../bip-multiselect/bip-multiselect.component';
import { AppSharedModule } from '../../shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton'
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { BipButtonComponent } from '../bip-button/bip-button.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { BipIconComponent } from '../bip-icon/bip-icon.component';
import { BipCalendarComponent } from '../bip-calendar/bip-calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { BipTextAreaComponent } from '../bip-text-area/bip-text-area.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  declarations: [BipLabelComponent,
    BipRadioComponent,
    BipCheckboxComponent,
    BipSelectButtonComponent,
    BipInputTextComponent,
    BipButtonComponent,
    BipInputNumberComponent,
    BipInputFileComponent,
    BipDataGridComponent,
    BipDropdownComponent,
    BipMultiselectComponent,
    BipIconComponent,
    BipCalendarComponent,
    BipTextAreaComponent,
  ],
  imports: [
    AppSharedModule,
    CheckboxModule,
    RadioButtonModule,
    SelectButtonModule,
    DropdownModule,
    MultiSelectModule,
    FileUploadModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
    AppSharedModule
  ], exports: [
    BipLabelComponent,
    BipRadioComponent,
    BipCheckboxComponent,
    BipSelectButtonComponent,
    BipInputTextComponent,
    BipInputNumberComponent,
    BipInputFileComponent,
    BipDataGridComponent,
    BipDropdownComponent,
    BipMultiselectComponent,
    BipButtonComponent,
    InputNumberModule,
    BipIconComponent,
    BipCalendarComponent,
    BipTextAreaComponent,
    FileUploadModule
  ]
})
export class BipSharedModule { }
