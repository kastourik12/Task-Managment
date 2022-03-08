import { AuthService } from './auth.service';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    SignUp(auth: AuthCredantialsDTO): Promise<void>;
}
