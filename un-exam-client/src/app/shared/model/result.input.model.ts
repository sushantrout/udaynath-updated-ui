export class ResultInputModel {
  subjectType!: string;
  sessionId!: number;
  educationType!: string;
  paperId!: number;
  semistar!: string;
  electiveId!: number;
  honoursId!: number;
  streamId!: number;
  results: ResultModel[] = [];
  rollNumber!:string;
  examType!:string;
}

export class ResultModel {
  roll!: string;
  mark!: number;
}
