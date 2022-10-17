import { Department } from './department.model';
import { SessionModel } from './session-model';
import { StreamModel } from './stream.model';
import { PaperModel } from './paper.model';
import { ElectiveModel } from './elective.model';

export class StudenModel {
  caste!: string;
  courseType!: string;
  department!: Department;
  dob!: any;
  emailId!: string;
  examRoolNumber!: string;
  fathersName!: string;
  fullName!: string;
  gender!: string;
  id!: 0;
  mothersName!: string;
  reg!: string;
  rollNumber!: string;
  session!: SessionModel;
  stream!: StreamModel;
  semistar!: string;
  examType!: string;
  paper!: PaperModel;
  elective!: ElectiveModel;
  contactNumber!:string;
  phoneNumber!:string;
}
