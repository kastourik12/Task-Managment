import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { UserRepository } from './user.repository';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    signUp(auth: AuthCredantialsDTO): Promise<void>;
    singIn(auth: AuthCredantialsDTO): Promise<void>;
}
