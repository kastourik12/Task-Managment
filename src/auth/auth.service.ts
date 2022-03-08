import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
        ){}
    
    async signUp(auth: AuthCredantialsDTO): Promise<void>{
        return await this.userRepository.signUp(auth);
    }    
    async singIn(auth: AuthCredantialsDTO){
        
        const result = await this.userRepository.validateUserPassword(auth);
        if(!result){
            throw new UnauthorizedException('Invalid credentials');
        }
        
    }
}
