import User from "@src/entities/user";
import UserRepoImpl from "@src/frameworks/databases/mongodb/repositories/user-repo-impl";

export const userRepoInterface = (repository:ReturnType<UserRepoImpl>) => {

    const add = async (user:User) => await repository.add(user)

    const findByEmail = async (email:string) => await repository.findByEmail(email)

    return {
        add,
        findByEmail
    }
}

 type UserRepoInterface = typeof userRepoInterface
 export default UserRepoInterface

