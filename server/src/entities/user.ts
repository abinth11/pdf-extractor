import { IUser } from "@src/types/user";

class User {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    constructor({ name, email, password, createdAt }: IUser) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}

export default User;
