import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {SECRET} from "../middleware/auth";

class UserService {
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    register = async (user) => {
        user.password = await bcrypt.hash(user.password, 10)
        return this.userRepository.save(user)
    }
    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return 'Username is not exist';
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password)
            if ((!passwordCompare)) {
                return 'Wrong password'
            } else {
                let payload = {
                    idUser: userCheck.id,
                    username: userCheck.username
                }
                return jwt.sign(payload,SECRET,{
                    expiresIn: 360000
                })
            }
        }
    }

}

export default new UserService();