import { Request } from "express";

export interface IUser {
    name:string;
    email:string;
    password:string;
    createdAt:Date;
}

export interface CustomRequest extends Request {
    userId?:string
}