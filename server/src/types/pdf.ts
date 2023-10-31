export interface IPagesArray {
    pages: number[];
}

export interface IPagesObject {
    pages: { from: number; to: number };
}

export type IPages = IPagesArray | IPagesObject;
