import HttpStatusCodes from "../../constants/http-status-codes";
import User from "../../entities/user";
import AppError from "../../utils/app-error";
import { validateEmail, validateName, validatePassword } from "./validate";

const validateUser = (user:User) =>{

    if(!validateEmail(user.email)){
        throw new AppError("Invalid email address, Enter a valid email address",HttpStatusCodes.BAD_REQUEST)
    }
    if(validateName(user.name)){
        throw new AppError("Invalid name, Enter a valid name",HttpStatusCodes.BAD_REQUEST)
    }

    if(validatePassword(user.password)){
        throw new AppError("Password must include at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.",HttpStatusCodes.BAD_REQUEST)
    }
    return user
}

export {
    validateUser
}