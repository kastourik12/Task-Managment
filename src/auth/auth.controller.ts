import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('signup')
    @UsePipes()
    SignUp(@Body(ValidationPipe) auth: AuthCredantialsDTO): Promise<void>{
     return  this.authService.signUp(auth);
    }
    
    @Post('signin')
    SignIn(@Body(ValidationPipe) auth: AuthCredantialsDTO): Promise<{accessToken : string}>{
        return this.authService.singIn(auth);
    }

    @Get('/all')
    getAllUsers(): Promise<User[]>{
        return this.authService.getAllUsers();
    }
}
