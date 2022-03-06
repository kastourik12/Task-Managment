import { IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class FilterDto{
    @IsOptional()
    @IsNotEmpty()
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search:string;
}