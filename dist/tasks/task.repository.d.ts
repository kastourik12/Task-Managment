import { Repository } from "typeorm";
import { TaskDTO } from "./dto/task.dto";
import { FilterDto } from "./dto/get-filter.dto";
import { Task } from "./task.entity";
import { User } from "src/auth/user.entity";
export declare class TaskRepository extends Repository<Task> {
    createTask(taskDTO: TaskDTO, user: User): Promise<Task>;
    getAllTasks(filter: FilterDto, user: User): Promise<Task[]>;
}
