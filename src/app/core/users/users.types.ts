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
// ]

export type user = {
    "_id": string,
    "firstName": string,
    "lastName": string,
    "role": {
        "name": string,
    },
    "email": string,
}

export type users = user[]

export type tableItem = { position: number; "_id": string, name: string; last: string; email: string; role: string; }