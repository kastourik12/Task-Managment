import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import { JwtPayload } from '../utils/jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService : JwtService,
        ){}
    
    async signUp(auth: AuthCredantialsDTO): Promise<void>{
        return await this.userRepository.signUp(auth);
    }  

    async singIn(auth: AuthCredantialsDTO): Promise<{ accessToken: string}>{
        
        const username = await this.userRepository.validateUserPassword(auth);
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload : JwtPayload = { username};
        const accessToken = await this.jwtService.sign(payload);
         
        return { accessToken };
        
    }
}
