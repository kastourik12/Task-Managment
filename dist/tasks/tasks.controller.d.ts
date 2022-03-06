import { FilterDto } from './pipes/get-filter.dto';
import { TaskDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
export declare class TasksController {
    private readonly taskssevice;
    constructor(taskssevice: TasksService);
    getAllTasks(filter: FilterDto): Promise<Task[]>;
    createTask(taskDTO: TaskDTO): Promise<Task>;
    getTaskById(id: number): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    updateTask(id: number, status: TaskStatus): Promise<Task>;
}
