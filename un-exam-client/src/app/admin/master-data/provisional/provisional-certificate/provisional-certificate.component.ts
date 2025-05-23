import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

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


  constructor(public commonService : CommonService) { }

  ngOnInit(): void {
  }

  getSerialNo(provisionalDetail : any) {
    let examRoolNumber = provisionalDetail.examRoolNumber;
    if(examRoolNumber.length > 5) {
      return examRoolNumber.substring(0, examRoolNumber.length-5) + "/" + this.issueDate + "/"
       + examRoolNumber.substring(examRoolNumber.length-3, examRoolNumber.length);
    }
    return "-----------------"
  }
}
