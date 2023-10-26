import User from "@src/entities/user";
import UserModel from "../models/user";

export const userRepoImpl = () =>{

    const add = (user:User) => {
        const newUser = new UserModel(user)
        return newUser.save()
    }

    const findByEmail = (email:string) => {
        const user = UserModel.findOne({email})
        return user
    }

    return {
        add,
        findByEmail
    }

}

export type UserRepoImpl = ReturnType<typeof userRepoImpl>
