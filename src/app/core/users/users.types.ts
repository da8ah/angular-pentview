// [
//     {
//         "_id": "6558e1f28fc312479cabaa57",
//         "firstName": "admin",
//         "lastName": "admin",
//         "role": {
//             "_id": "6558e1f28fc312479cabaa53",
//             "name": "ADMIN",
//             "createdAt": "2023-11-18T16:10:26.126Z",
//             "__v": 0
//         },
//         "email": "admin@yopmail.com",
//         "createdAt": "2023-11-18T16:10:26.314Z",
//         "__v": 0
//     }
// ,
// {
//     "_id": "6558e5e38fc312479cabaa62",
//         "firstName": "Manuel",
//             "lastName": "Aguinsaca",
//                 "role": {
//         "_id": "6558e1f28fc312479cabaa53",
//             "name": "ADMIN",
//                 "createdAt": "2023-11-18T16:10:26.126Z",
//                     "__v": 0
//     },
//     "email": "manuel@yopmail.com",
//         "profileImage": "upload/1700324834885Designer.png",
//             "createdAt": "2023-11-18T16:27:15.007Z",
//                 "__v": 0
// }
// ]

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