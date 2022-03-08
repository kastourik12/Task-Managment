import { JwtService } from '@nestjs/jwt';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    getAllUsers(): Promise<User[]>;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(auth: AuthCredantialsDTO): Promise<void>;
    singIn(auth: AuthCredantialsDTO): Promise<{
        accessToken: string;
    }>;
}
