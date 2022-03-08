import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredantialsDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;
    @IsString()
    @MinLength(8)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: "paasword too weak"}
        )
    password : string;
}