import { FormValues } from "../types/form-value";
import { Auth } from "./abstract";
import { axiosInstance } from "./config";
class AuthApi extends Auth {
    constructor() {
        super()
    }

    async signUp(userInfo: FormValues) {
        try {
            const response = await axiosInstance.post(this.EndPoints.SIGN_UP, userInfo)
            return response.data
        } catch (err) {
            throw err
        }
    }

    async signIn(userInfo: FormValues) {
        try {
            const response = await axiosInstance.post(this.EndPoints.SIGN_IN, userInfo)
            return response.data
        } catch (err) {
            throw err
        }

    }

}

export default AuthApi