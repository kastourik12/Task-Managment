import { TaskDTO } from './dto/task.dto';
import { FilterDto } from './dto/get-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private taskRepository;
    updateTaskTitle(id: number, title: string): Promise<Task>;
    constructor(taskRepository: TaskRepository);
    getTaskById(id: number): Promise<Task>;
    getAllTasks(filter: FilterDto, user: User): Promise<Task[]>;
    createTask(taskDTO: TaskDTO, user: User): Promise<Task>;
    deleteTask(id: number): Promise<void>;
    updateTask(id: number, status: TaskStatus): Promise<Task>;
}
