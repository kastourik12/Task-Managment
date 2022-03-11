import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilterDto} from './dto/get-filter.dto';
import { TaskDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe'
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly taskssevice : TasksService) {}
    @Get()
    getAllTasks(
        @Query() filter : FilterDto,
        @GetUser() user : User
        ): Promise<Task[]>{
        const tasks = this.taskssevice.getAllTasks(filter,user);
        return tasks;
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    createTask( 
        @Body() taskDTO: TaskDTO,
        @GetUser() user: User,
        ): Promise<Task>{
       return this.taskssevice.createTask(taskDTO,user);
    }
    @Get('/:id')
    getTaskById(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user:User
        ): Promise<Task>{
            return this.taskssevice.getTaskById(id,user);
    } 
    @Delete(':id')
    deleteTask(
        @Param('id',ParseIntPipe) id:number, 
        @GetUser() user:User
        ): Promise<void>{
       return this.taskssevice.deleteTask(id,user);
    }

    @Patch('/status/:id')
    updateTaskStatus (
        @Param('id',ParseIntPipe ) id:number,
        @Body('status',TaskStatusValidationPipe) status:TaskStatus,
        @GetUser() user:User
        ): Promise<Task>{
       return this.taskssevice.updateTask(id,status,user);
    }
    @Patch(':id/title')
    updateTaskTitles(
        @Param('id',ParseIntPipe) id:number,
        title:string, 

 @GetUser() user:User
        ): Promise<Task>{
        return this.taskssevice.updateTaskTitle(id,title,user);
    }

}
