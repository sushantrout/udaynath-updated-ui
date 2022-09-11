import { Department } from "./department.model";
import { Role } from "./role.model";

export class UserProfile {
    id!: number;
    name!: string;
    email!: string;
    phone!: number;
    role!: Role;
}