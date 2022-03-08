import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
export declare class UserRepository extends Repository<User> {
    signUp(auth: AuthCredantialsDTO): Promise<void>;
    validateUserPassword(auth: AuthCredantialsDTO): Promise<string>;
    private hashPassword;
}
