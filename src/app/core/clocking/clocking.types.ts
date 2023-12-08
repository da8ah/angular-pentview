export type clocking = {
    "_id": string,
    "register": string,
    "type": "in" | "out",
    "__v": 0
}

export type tableItem = { position: number; _id: string; type: "in" | "out"; register: string | Date }