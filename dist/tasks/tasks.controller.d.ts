import { FilterDto } from './dto/get-filter.dto';
import { TaskDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
export declare class TasksController {
    private readonly taskssevice;
    constructor(taskssevice: TasksService);
    getAllTasks(filter: FilterDto, user: User): Promise<Task[]>;
    createTask(taskDTO: TaskDTO, user: User): Promise<Task>;
    getTaskById(id: number, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
    updateTaskTitles(id: number, title: string, user: User): Promise<Task>;
}
