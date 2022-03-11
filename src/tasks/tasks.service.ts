import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

import { TaskDTO } from './dto/task.dto';
import { FilterDto } from './dto/get-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    // }
   async updateTaskTitle(id: number, title: string, user: User): Promise<Task> {
        const updated = await this.getTaskById(id,user);
        updated.title = title;
        return updated;
    }

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}
        
   async getTaskById( 
       id:number, 
       user:User
       ): Promise<Task>{
        const found = await this.taskRepository.findOneUser(id,user);
        if(!found){
            throw new NotFoundException(`task with ID: "${id}" is not found`);
        }
        else 
            return found;
    }
    async getAllTasks( 
        filter: FilterDto,
        user: User
        ) : Promise<Task[]>{
            return this.taskRepository.getAllTasks(filter,user);
    }
   async createTask( taskDTO : TaskDTO,user : User): Promise<Task>{
       return this.taskRepository.createTask(taskDTO,user);
    }
   async deleteTask(id: number,user : User) : Promise<void>{
        try { await this.taskRepository.deleteTask(id,user);
        }
        catch(error){
            console.log(error.message);
            throw new NotFoundException(`task with ID:"${id}" is not found`);
        }
        }   
    async updateTask(id:number , status:TaskStatus, user:User): Promise<Task>{
               const updated= await this.getTaskById(id,user);
               updated.status = status;
               return updated;     
            }    
    }
  

