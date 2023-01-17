export class ResultInputModel {
  subjectType!: string;
  sessionId!: number;
  educationType!: string;
  paperId!: number;
  semistar!: string;
  electiveId!: number;
  departmentId!: number;
  streamId!: number;
  results: ResultModel[] = [];
  rollNumber!:string;
  examType!:string;
  veId!:number;
}

export class ResultModel {
  roll!: string;
  mark!: number;
}
