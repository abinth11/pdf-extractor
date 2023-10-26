import User from "@src/entities/user";
import UserModel from "../models/user";

export const userRepoImpl = () =>{

    const add = async (user:User) => {
        const newUser = new UserModel(user)
        return await newUser.save()
    }

    const findByEmail = async (email:string) => {
        const user = await UserModel.findOne({email})
        return user
    }

    return {
        add,
        findByEmail
    }

}

type UserRepoImpl = typeof userRepoImpl
export default UserRepoImpl
