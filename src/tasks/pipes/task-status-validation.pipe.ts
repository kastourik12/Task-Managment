import {BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import {TaskStatus } from "../task-status.enum"

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
    
        value = value.toUpperCase();
        if(!this.isAllowed(value))
        {
            throw new BadRequestException(`can't match task status to : "${value}"`);
        }   
        return value;
    }
    private isAllowed(status : any){
        const valid = this.allowedStatus.indexOf(status);
        return valid !== -1;
    }
}
