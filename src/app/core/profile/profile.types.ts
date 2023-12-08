import { user } from "../users/users.types";

export type profile = user;

export type putProfile = {
    "firstName": string,
    "lastName": string,
    "email": string
};