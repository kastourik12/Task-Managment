import { TaskDTO } from './dto/task.dto';
import { FilterDto } from './pipes/get-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: number): Promise<Task>;
    getAllTasks(filter: FilterDto): Promise<Task[]>;
    createTask(taskDTO: TaskDTO): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    updateTask(id: number, status: TaskStatus): Promise<Task>;
}
