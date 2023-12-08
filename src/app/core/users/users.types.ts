import { role } from "../roles/roles.types";

export type user = {
    "_id": string,
    "firstName": string,
    "lastName": string,
    "role": role,
    "email": string,
    "createdAt": string,
    "profileImage"?: string | File,
    "__v": number
}

export type tableItem = { position: number; "_id": string, name: string; last: string; email: string; role: string; }