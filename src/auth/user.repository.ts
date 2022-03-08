import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredantialsDTO } from './dto/auth-credantials.dto';
import * as bcrypt from "bcrypt";
import { ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(auth : AuthCredantialsDTO): Promise<void>{
        const {username, password} = auth;
        
        const salt = await bcrypt.genSalt();
        const user = new User();
                user.username = username;
                user.salt = salt;
                user.password = await this.hashPassword(password,user.salt);
                try {
                   await user.save();
                }
                catch (err) {
                    throw new ConflictException('Username already exists'); 
                 }
    }
    async validateUserPassword(auth: AuthCredantialsDTO): Promise<string> {
        const {username, password} = auth;
        const user = await this.findOne({username});

        if(user && await user.validatePassword(password)){
            return user.username;
        }
        else return null; 
    }
    private async hashPassword(password: string,salt: string): Promise<string> {
        return await bcrypt.hash(password,salt);
    }
    
}