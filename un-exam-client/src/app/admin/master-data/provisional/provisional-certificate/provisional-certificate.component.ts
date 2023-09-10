import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-provisional-certificate',
  templateUrl: './provisional-certificate.component.html',
  styleUrls: ['./provisional-certificate.component.css']
})
export class ProvisionalCertificateComponent implements OnInit {

  @Input() downloadDetails : any
  @Input() studentModel : any;
  @Input() issueDate :any;
  @Input() departmentPlaceHolder :any;


  constructor() { }

  ngOnInit(): void {
  }

}
