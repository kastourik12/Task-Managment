import { Repository } from "typeorm";
import { TaskDTO } from "./dto/task.dto";
import { FilterDto } from "./pipes/get-filter.dto";
import { Task } from "./task.entity";
export declare class TaskRepository extends Repository<Task> {
    createTask(taskDTO: TaskDTO): Promise<Task>;
    getAllTasks(filter: FilterDto): Promise<Task[]>;
}
