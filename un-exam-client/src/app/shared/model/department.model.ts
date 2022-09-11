import { SessionModel } from "./session-model";
import { StreamModel } from "./stream.model";

export class Department {
    id!: number;
    name!: string;
    courseType!:string;
    sessionId!:SessionModel;
    sessionText!:string;
    streamId!:StreamModel;
    streamText!:string;
}