import { IUser } from "@src/types/user";

class User {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    constructor({ name, email, password }: IUser) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
}

export default User;
