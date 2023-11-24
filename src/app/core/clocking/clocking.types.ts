// {
//     "data": [
//         {
//             "_id": "655f8bef72f603103e26a1ce",
//             "register": "2023-11-18T15:34:38.427Z",
//             "type": "in",
//             "__v": 0
//         },
//         {
//             "_id": "655fb20e72f603103e26a2fb",
//             "type": "in",
//             "__v": 0
//         },
//     ]
// }

export type clocking = {
    "_id": string,
    "register": string,
    "type": "in" | "out",
    "__v": 0
}

export type tableItem = { position: number; _id: string; type: "in" | "out"; register: string | Date }