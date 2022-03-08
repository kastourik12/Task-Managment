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
   async updateTaskTitle(id: number, title: string): Promise<Task> {
        const updated = await this.getTaskById(id);
        updated.title = title;
        return updated;
    }

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){}
        
   async getTaskById(id:number): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
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
   async deleteTask(id: number) : Promise<void>{
        const deleted = await this.taskRepository.delete(id);
        if(deleted.affected==0){
               throw new NotFoundException(`Task with ID "${id}" not found`) ;
        }
        }   
    async updateTask(id:number , status:TaskStatus): Promise<Task>{
               const updated= await this.getTaskById(id);
               updated.status = status;
               return updated;     
            }    
    }
  

