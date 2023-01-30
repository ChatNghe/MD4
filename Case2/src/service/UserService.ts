import {User} from "../model/user";
import {AppDataSource} from "../data-source";

class UserService{
    private userRepository
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    getAll = async () => {
        let users = await this.userRepository.find();
        return users;
    }
    checkUser = async (user) =>{
        let userCheck = await this.userRepository.findOneBy({username: user.username, password: user.password})
        if (!userCheck){
            return null
        }
        return userCheck;
    }
    addUser = async (users) => {
        let user = await this.userRepository.save(users);
        return user;
    }
}

export default new UserService();