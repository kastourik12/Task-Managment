import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilterDto} from './dto/get-filter.dto';
import { TaskDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import {TaskStatusValidationPipe} from './pipes/task-status-validation.pipe'

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskssevice : TasksService) {}
    @Get()
    getAllTasks(@Query() filter : FilterDto): Promise<Task[]>{
        const tasks = this.taskssevice.getAllTasks(filter);
        return tasks;
    }
    @Post('add')
    @UsePipes(ValidationPipe)
    createTask( @Body() taskDTO: TaskDTO): Promise<Task>{
       return this.taskssevice.createTask(taskDTO);
    }
    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id:number): Promise<Task>{
            return this.taskssevice.getTaskById(id);
    } 
    @Delete(':id')
    deleteTask(@Param('id',ParseIntPipe) id:number): Promise<void>{
       return this.taskssevice.deleteTask(id);
    }

    @Patch('/status/:id')
    updateTaskStatus (
        @Param('id',ParseIntPipe ) id:number,
        @Body('status',TaskStatusValidationPipe) status:TaskStatus
        ): Promise<Task>{
       return this.taskssevice.updateTask(id,status);
    }
    @Patch(':id/title')
    updateTaskTitles(@Param('id',ParseIntPipe) id:number,title:string): Promise<Task>{
        return this.taskssevice.updateTaskTitle(id,title);
    }
}
