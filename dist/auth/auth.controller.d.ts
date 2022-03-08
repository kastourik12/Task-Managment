import { AuthService } from './auth.service';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    SignUp(auth: AuthCredantialsDTO): Promise<void>;
    SignIn(auth: AuthCredantialsDTO): Promise<{
        accessToken: string;
    }>;
    getAllUsers(): Promise<User[]>;
}
