import { Department } from "./department.model";
import { Role } from "./role.model";

export class User {
    username!: string;
    password!: string;
    enabled!: true;
    id!: number;
    profile: Profile = new Profile();
    roles: Role[] = [];
    userRoles: string[] = [];
}
export class Profile {
    department: Department = new Department();
    emailId!: string;
    fullName!: string;
    id!: number;
    phone!: number;
    profilePic: ApplicationBlobData = new ApplicationBlobData();
}
export class ApplicationBlobData {
    id!: number;
    name!: string;
    type!: string;
    picByte!: any;
}

